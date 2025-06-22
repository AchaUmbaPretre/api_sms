import { prisma } from '../../config/prisma';

interface CreateAnneeAcademiqueDTO {
  libelle: string;
  date_debut: Date;
  date_fin: Date;
  actif: boolean;
}

export const anneeAcademiqueService = {
  async createAnneeAcademique(data: CreateAnneeAcademiqueDTO) {
    const { libelle, date_debut, date_fin, actif } = data;

    try {
      return await prisma.anneeAcademique.create({
        data: {
          libelle,
          date_debut,
          date_fin,
          actif,
        },
      });
    } catch (error) {
      console.error('[AnneeService][createAnneeAcademique] Erreur :', error);
      throw new Error("Impossible de créer l'année académique");
    }
  },

  async findAll() {
    return await prisma.anneeAcademique.findMany()
  }
};
