import { Niveau } from '@prisma/client';
import { prisma } from '../../config/prisma';

interface CreateClasseDTO {
    nom_classe: string;
    niveau?: Niveau;
    annee_academiqueId: number
    id_filiere: number
}

interface CreateFiliereDTO {
    nom_filiere: string
}


export const classeService = {
    async createdClasse(data: CreateClasseDTO) {
        const {
            nom_classe,
            niveau,
            annee_academiqueId,
            id_filiere
        } = data;

        try {
            return await prisma.classe.create({
                data: {
                    nom_classe,
                    niveau,
                    annee_academiqueId,
                    id_filiere
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

export const filieresService = {
    async createdFiliere(data: CreateFiliereDTO) {
        const {
            nom_filiere
        } = data;

        try {
            return await prisma.filieres.create({
                data: {
                    nom_filiere
                },
            });
            
        } catch (error) {
            console.error('[filiereService][createFiliereService] Erreur :', error);
            throw new Error("Impossible de créer une filiere");
        }
    },

    async findAll() {
        return await prisma.filieres.findMany()
    }
}