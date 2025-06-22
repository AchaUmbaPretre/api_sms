import { prisma } from '../../config/prisma';
import { authService } from '../auth/auth.service';
import { Role, Sexe } from '@prisma/client';

interface CreateEleveWithAccountDTO {
  prenom: string;
  email: string;
  motDePasse: string;
  date_naissance: Date;
  sexe?: Sexe;
  adresse: string;
  annee_academique_id: number;
}

interface UpdateEleveDTO {
  date_naissance?: Date;
  sexe?: Sexe;
  adresse?: string;
  annee_academique_id?: number;
}

export const eleveService = {
  async createWithAccount(data: CreateEleveWithAccountDTO) {
    const {
      prenom,
      email,
      motDePasse,
      date_naissance,
      sexe = 'M',
      adresse,
      annee_academique_id,
    } = data;

    try {
      const hashedPassword = await authService.hashPassword(motDePasse);

      return await prisma.user.create({
        data: {
          prenom,
          email,
          mot_de_passe: hashedPassword,
          role: Role.eleve,
          eleve: {
            create: {
              date_naissance,
              sexe,
              adresse,
              annee_academique_id,
            },
          },
        },
        include: {
          eleve: true,
        },
      });
    } catch (error) {
      console.error('[EleveService][createWithAccount] Erreur:', error);
      throw new Error('Impossible de créer le compte élève');
    }
  },

  // 🔹 Récupérer tous les élèves avec leur compte
  async findAll() {
    return await prisma.eleve.findMany({
      include: { user: true },
    });
  },

  // 🔹 Récupérer un élève par ID
  async findById(id_eleve: number) {
    const eleve = await prisma.eleve.findUnique({
      where: { id_eleve },
      include: { user: true },
    });

    if (!eleve) {
      throw new Error("Élève introuvable");
    }

    return eleve;
  },

  // 🔹 Mettre à jour un élève
  async update(id_eleve: number, data: UpdateEleveDTO) {
    try {
      return await prisma.eleve.update({
        where: { id_eleve },
        data,
        include: { user: true },
      });
    } catch (error) {
      console.error('[EleveService][update] Erreur:', error);
      throw new Error("Impossible de mettre à jour l’élève");
    }
  },

  // 🔹 Supprimer un élève (et son compte utilisateur)
  async delete(id_eleve: number) {
    try {
      // On récupère l'élève pour supprimer aussi le user lié
      const eleve = await prisma.eleve.findUnique({
        where: { id_eleve },
        include: { user: true },
      });

      if (!eleve) {
        throw new Error("Élève introuvable");
      }

      // Supprimer le user supprime aussi l'élève grâce à la relation
      await prisma.user.delete({
        where: { id: eleve.userId },
      });

    } catch (error) {
      console.error('[EleveService][delete] Erreur:', error);
      throw new Error("Impossible de supprimer l’élève");
    }
  },
};
