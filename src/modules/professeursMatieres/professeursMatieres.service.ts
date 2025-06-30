import { prisma } from '../../config/prisma';

interface CreateProfMatiere {
    id_professeur: number,
    id_matiere: number,
    id_classe: number
}

export const profMatiereService = {
  async createWithAccount(data: CreateProfMatiere) {
    const { id_professeur, id_matiere, id_classe } = data;

    try {
        return await prisma.professeurs_matieres.create({
            data: {
                id_professeur,
                id_matiere,
                id_classe
            },
        });

    } catch (error) {
      console.error('[ProfMatiereService][createWithAccount] Erreur :', error);
      throw new Error('Impossible de créer le compte matiereService');
    }
  },

  async findAll() {
    return await prisma.professeurs_matieres.findMany();
  },

  async findById(id_professeurs_matieres: number) {
    const profMatiere = await prisma.professeurs_matieres.findUnique({
      where: { id_professeurs_matieres } });

    if (!profMatiere) {
      throw new Error('Professeurs matieres introuvable');
    }

    return profMatiere;
  },

  async update(id_professeurs_matieres: number, data: CreateProfMatiere) {
    try {
      return await prisma.professeurs_matieres.update({
        where: { id_professeurs_matieres },
        data
      });
    } catch (error) {
      console.error('[MatiereService][update] Erreur :', error);
      throw new Error("Impossible de mettre à jour la matiere");
    }
  },

  async delete(id_professeurs_matieres: number) {
    try {
      const profMatiere = await prisma.professeurs_matieres.findUnique({
        where: { id_professeurs_matieres }
      });

      if (!profMatiere) {
        throw new Error('Prof Matiere introuvable');
      }

      await prisma.professeurs_matieres.delete({ where: { id_professeurs_matieres } });

    } catch (error) {
      console.error('[ProfMatiereService][delete] Erreur :', error);
      throw new Error("Impossible de supprimer cette affectation");
    }
  },
};
