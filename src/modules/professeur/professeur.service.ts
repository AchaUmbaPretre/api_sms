import { Sexe } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { authService } from '../auth/auth.service';

interface CreateProfesseur {
    motDePasse: string,
    prenom: string,
    sexe?: Sexe;
    email: string,
    nom: string,
    postnom: string,
    id_specialite: number,
}

interface CreateSpecialite {
  nom_specialite: string
}

export const professeurService = {
  async createWithAccount(data: CreateProfesseur) {
    const { motDePasse, prenom, email, nom, postnom, sexe, id_specialite } = data;

    try {
      const hashedPassword = await authService.hashPassword(motDePasse);

      // 💡 Transaction sécurisée
      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            prenom,
            email,
            mot_de_passe: hashedPassword,
            role: 'enseignant',
          },
        });

        const professeur = await tx.professeurs.create({
          data: {
            nom,
            postnom,
            sexe,
            userId: user.id,
            id_specialite 
          },
          include: {
            user: true,
          },
        });

        return professeur;
      });

      return result;

    } catch (error) {
      console.error('[ProfesseurService][createWithAccount] Erreur :', error);
      throw new Error('Impossible de créer le compte professeur');
    }
  },

  async findAll() {
    return await prisma.professeurs.findMany({
      include: { user: true },
    });
  },

  async findById(id_professeur: number) {
    const professeur = await prisma.professeurs.findUnique({
      where: { id_professeur },
      include: { user: true },
    });

    if (!professeur) {
      throw new Error('Professeur introuvable');
    }

    return parent;
  },

  async update(id_professeur: number, data: Partial<Omit<CreateProfesseur, 'motDePasse' | 'email'>>) {
    try {
      return await prisma.professeurs.update({
        where: { id_professeur },
        data,
        include: { user: true },
      });
    } catch (error) {
      console.error('[ProfesseurService][update] Erreur :', error);
      throw new Error("Impossible de mettre à jour le professeur");
    }
  },

  async delete(id_professeur: number) {
    try {
      const parent = await prisma.professeurs.findUnique({
        where: { id_professeur },
        include: { user: true },
      });

      if (!parent) {
        throw new Error('Parent introuvable');
      }

      await prisma.professeurs.delete({ where: { id_professeur } });
      await prisma.user.delete({ where: { id: parent.userId } });

    } catch (error) {
      console.error('[ProfesseurService][delete] Erreur :', error);
      throw new Error("Impossible de supprimer le professeur");
    }
  },
};

export const specialiteService = {
  async createWithAccount(data: CreateSpecialite) {
    const { nom_specialite } = data;

    try {

        return await prisma.specialite.create({
          data: {
            nom_specialite 
          },
        });

    } catch (error) {
      console.error('[SpecialiteService][createWithAccount] Erreur :', error);
      throw new Error('Impossible de créer le compte specialite');
    }
  },

  async findAll() {
    return await prisma.specialite.findMany();
  },

  async findById(id_specialite : number) {
    const specialite = await prisma.specialite.findUnique({
      where: { id_specialite  }
    });

    if (!specialite) {
      throw new Error('Specialite introuvable');
    }

    return specialite;
  },

  async update(id_specialite: number, data: CreateSpecialite) {
    try {
      return await prisma.specialite.update({
        where: { id_specialite },
        data
      });
    } catch (error) {
      console.error('[SpecialiteService][update] Erreur :', error);
      throw new Error("Impossible de mettre à jour la specialite");
    }
  },

  async delete(id_specialite: number) {
    try {
      const specialite = await prisma.specialite.findUnique({
        where: { id_specialite }
      });

      if (!specialite) {
        throw new Error('Specialite introuvable');
      }

      await prisma.specialite.delete({ where: { id_specialite } });

    } catch (error) {
      console.error('[SpecialiteService][delete] Erreur :', error);
      throw new Error("Impossible de supprimer la specialite");
    }
  },
};
