import { prisma } from '../../config/prisma';

interface CreateMatiere {
    nom_matiere: string,
    coefficient: number,
}

export const matiereService = {
  async createWithAccount(data: CreateMatiere) {
    const { nom_matiere, coefficient } = data;

    try {
        return await prisma.matieres.create({
            data: {
                nom_matiere,
                coefficient
            },
        });

    } catch (error) {
      console.error('[MatiereService][createWithAccount] Erreur :', error);
      throw new Error('Impossible de créer le compte matiere');
    }
  },

  async findAll() {
    return await prisma.matieres.findMany();
  },

  async findById(id_matiere: number) {
    const matiere = await prisma.matieres.findUnique({
      where: { id_matiere } });

    if (!matiere) {
      throw new Error('Matiere introuvable');
    }

    return matiere;
  },

  async update(id_matiere: number, data: CreateMatiere) {
    try {
      return await prisma.matieres.update({
        where: { id_matiere },
        data
      });
    } catch (error) {
      console.error('[MatiereService][update] Erreur :', error);
      throw new Error("Impossible de mettre à jour la matiere");
    }
  },

  async delete(id_matiere: number) {
    try {
      const matiere = await prisma.matieres.findUnique({
        where: { id_matiere }
      });

      if (!matiere) {
        throw new Error('Matiere introuvable');
      }

      await prisma.matieres.delete({ where: { id_matiere } });

    } catch (error) {
      console.error('[MatiereService][delete] Erreur :', error);
      throw new Error("Impossible de supprimer la matiere");
    }
  },
};
