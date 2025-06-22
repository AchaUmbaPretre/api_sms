import { prisma } from '../../config/prisma';

interface CreateClasseDTO {
    nom_classe: string;
    niveau: string;
    annee_academiqueId: number
}

export const classeService = {
    async createdClasse(data: CreateClasseDTO) {
        const {
            nom_classe,
            niveau: string,
            annee_academiqueId
        } = data;

        try {
            return await prisma.classe.create({
                data: {
                    nom_classe,
                    niveau: string,
                    annee_academiqueId
                },
            });
            
        } catch (error) {
            console.error('[classeService][createClasseService] Erreur :', error);
            throw new Error("Impossible de créer une salle de classe");
        }
    },

    async findAll() {
        return await prisma.classe.findMany()
    }
}
