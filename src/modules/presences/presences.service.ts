import { Periode, StatutPresence } from '@prisma/client';
import { prisma } from '../../config/prisma';

interface CreatePresenceDTO {
  id_eleve: number;
  date_presence: Date;
  status?: StatutPresence;
  id_absence_motifs?: number;
  periode?: Periode;
  created_by: number;
}

interface CreateAbsenceMotifDTO {
  libelle: string;
}

interface CreateJourFeriesDTO {
  date: string; // ex. '2024-11-30'
  nom: string;
}


export const presenceService = {
  async createPresence(data: CreatePresenceDTO) {
    // Vérifie si c'est un jour férié
    const isHoliday = await prisma.jours_feries.findFirst({
      where: {
        date: new Date(data.date_presence).toISOString().split('T')[0],
      },
    });

    if (isHoliday) {
      throw new Error(`Le ${isHoliday.nom} est un jour férié. Impossible d'enregistrer la présence.`);
    }

    // Vérifie doublon
    const existing = await prisma.presences.findFirst({
      where: {
        id_eleve: data.id_eleve,
        date_presence: data.date_presence,
        periode: data.periode || 'matin',
      },
    });

    if (existing) {
      throw new Error(`La présence est déjà enregistrée pour cet élève à cette date et période.`);
    }

    return prisma.presences.create({
      data: {
        id_eleve: data.id_eleve,
        date_presence: data.date_presence,
        status: data.status || 'present',
        id_absence_motifs: data.id_absence_motifs,
        periode: data.periode || 'matin',
        created_by: data.created_by,
      },
    });
  },

  async createAbsenceMotif(data: CreateAbsenceMotifDTO) {
    return prisma.absence_motifs.create({
      data: {
        libelle: data.libelle,
      },
    });
  },

  async createJourFerie(data: CreateJourFeriesDTO) {
    const parsedDate = new Date(data.date);

    const exists = await prisma.jours_feries.findUnique({
      where: {
        date: parsedDate,
      },
    });

    if (exists) {
      throw new Error(`Le jour férié du ${data.date} est déjà enregistré (${exists.nom}).`);
    }

    return prisma.jours_feries.create({
      data: {
        date: parsedDate,
        nom: data.nom,
      },
    });
  },

  async getPresencesParMois(id_eleve: number, annee: number, mois: number) {
    const start = new Date(annee, mois - 1, 1);
    const end = new Date(annee, mois, 0);

    return prisma.presences.findMany({
      where: {
        id_eleve,
        date_presence: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { date_presence: 'asc' },
    });
  },

  async getStatistiquesParEleve(id_eleve: number) {
    const total = await prisma.presences.count({
      where: { id_eleve },
    });

    const absents = await prisma.presences.count({
      where: {
        id_eleve,
        status: 'absent',
      },
    });

    const justifies = await prisma.presences.count({
      where: {
        id_eleve,
        status: 'justifie',
      },
    });

    return {
      total,
      presents: total - absents - justifies,
      absents,
      justifies,
    };
  },

  async getPresencesParClasseEtMois(id_classe: number, annee: number, mois: number) {
    // Début du mois
    const debutMois = new Date(annee, mois - 1, 1);
    // Fin du mois
    const finMois = new Date(annee, mois, 0, 23, 59, 59, 999);

    const presences = await prisma.presences.findMany({
      where: {
        eleve: {
          id_classe: id_classe,
        },
        date_presence: {
          gte: debutMois,
          lte: finMois,
        },
      },
      include: {
        eleve: {
          select: {
            id_eleve: true,
            nom: true,
            postnom: true,
          },
        },
        absence_motifs: true,
      },
      orderBy: {
        date_presence: 'asc',
      },
    });

    return presences;
  },

};
