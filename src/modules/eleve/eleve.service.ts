import { prisma } from '../../config/prisma';
import { authService } from '../auth/auth.service';
import { Role, Sexe } from '@prisma/client';

interface CreateEleveWithAccountDTO {
  prenom: string;
  nom: string;
  postnom: string;
  email: string;
  motDePasse: string;
  date_naissance: Date;
  sexe?: Sexe;
  adresse: string;
  annee_academique_id: number;
}

interface CreateEleveParent {
  id_eleve: number;
  id_parent: number
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
      nom,
      postnom,
      email,
      motDePasse,
      date_naissance,
      sexe = 'M',
      adresse,
      annee_academique_id,
    } = data;

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('Email déjà utilisé.');
      }

      const hashedPassword = await authService.hashPassword(motDePasse);

      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            prenom,
            email,
            mot_de_passe: hashedPassword,
            role: Role.eleve,
          },
        });

        const eleve = await tx.eleve.create({
          data: {
            nom,
            postnom,
            date_naissance,
            sexe,
            adresse,
            annee_academique_id,
            userId: user.id,
          },
        });

        return {
          ...user,
          eleve,
        };
      });

      return result;
    } catch (error) {
      console.error('[EleveService][createWithAccount] Erreur:', error);
      throw new Error('Impossible de créer le compte élève');
    }
  },

  async findAll() {
    return await prisma.eleve.findMany({
      include: { user: true },
    });
  },

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

  async delete(id_eleve: number) {
    try {
      const eleve = await prisma.eleve.findUnique({
        where: { id_eleve },
        include: { user: true },
      });

      if (!eleve) {
        throw new Error("Élève introuvable");
      }

      await prisma.eleve.delete({ where: { id_eleve } });
      await prisma.user.delete({ where: { id: eleve.userId } });

    } catch (error) {
      console.error('[EleveService][delete] Erreur:', error);
      throw new Error("Impossible de supprimer l’élève");
    }
  },
};


export const eleveParentService = {
  async createWithAccount(data: CreateEleveParent) {
    const { id_eleve, id_parent } = data;

    try {
        return await prisma.eleves_parents.create({
            data: {
                id_eleve,
                id_parent
            },
        });

    } catch (error) {
      console.error('[EleveParentService][createWithAccount] Erreur :', error);
      throw new Error('Impossible de créer le compte Eleve parent');
    }
  },

  async findAll() {
    return await prisma.eleves_parents.findMany();
  },

  async findById(id_eleve_parent: number) {
    const elevesParents = await prisma.eleves_parents.findUnique({
      where: { id_eleve_parent } });

    if (!elevesParents) {
      throw new Error('Eleves parents introuvable');
    }

    return elevesParents;
  },

  async update(id_eleve_parent: number, data: CreateEleveParent) {
    try {
      return await prisma.eleves_parents.update({
        where: { id_eleve_parent },
        data
      });
    } catch (error) {
      console.error('[EleveParentService][update] Erreur :', error);
      throw new Error("Impossible de mettre à jour l'eleve parent");
    }
  },

  async delete(id_eleve_parent: number) {
    try {
      const eleveParent = await prisma.eleves_parents.findUnique({
        where: { id_eleve_parent }
      });

      if (!eleveParent) {
        throw new Error('Eleve parent introuvable');
      }

      await prisma.eleves_parents.delete({ where: { id_eleve_parent } });

    } catch (error) {
      console.error('[EleveParentService][delete] Erreur :', error);
      throw new Error("Impossible de supprimer cette affectation");
    }
  },
};
