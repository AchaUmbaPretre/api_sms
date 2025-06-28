import { Sexe } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { authService } from '../auth/auth.service';

interface CreateParent {
  motDePasse: string;
  prenom: string;
  email: string;
  nom: string;
  postnom: string;
  sexe?: Sexe;
}

export const parentService = {
  async createWithAccount(data: CreateParent) {
    const { motDePasse, prenom, email, nom, postnom, sexe } = data;

    try {
      const hashedPassword = await authService.hashPassword(motDePasse);

      // 💡 Transaction sécurisée
      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            prenom,
            email,
            mot_de_passe: hashedPassword,
            role: 'parent',
          },
        });

        const parent = await tx.parents.create({
          data: {
            nom,
            postnom,
            sexe,
            userId: user.id,
          },
          include: {
            user: true,
          },
        });

        return parent;
      });

      return result;

    } catch (error) {
      console.error('[ParentService][createWithAccount] Erreur :', error);
      throw new Error('Impossible de créer le compte parent');
    }
  },

  async findAll() {
    return await prisma.parents.findMany({
      include: { user: true },
    });
  },

  async findById(id_parent: number) {
    const parent = await prisma.parents.findUnique({
      where: { id_parent },
      include: { user: true },
    });

    if (!parent) {
      throw new Error('Parent introuvable');
    }

    return parent;
  },

  async update(id_parent: number, data: Partial<Omit<CreateParent, 'motDePasse' | 'email'>>) {
    try {
      return await prisma.parents.update({
        where: { id_parent },
        data,
        include: { user: true },
      });
    } catch (error) {
      console.error('[ParentService][update] Erreur :', error);
      throw new Error("Impossible de mettre à jour le parent");
    }
  },

  async delete(id_parent: number) {
    try {
      const parent = await prisma.parents.findUnique({
        where: { id_parent },
        include: { user: true },
      });

      if (!parent) {
        throw new Error('Parent introuvable');
      }

      await prisma.parents.delete({ where: { id_parent } });
      await prisma.user.delete({ where: { id: parent.userId } });

    } catch (error) {
      console.error('[ParentService][delete] Erreur :', error);
      throw new Error("Impossible de supprimer le parent");
    }
  },
};
