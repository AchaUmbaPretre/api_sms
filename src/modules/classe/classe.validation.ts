import { z } from 'zod';

export const createClasseSchema = z.object({
    nom_classe: z.string().min(2, 'Le nom est requis'),
    niveau: z.number({ required_error: 'Niveau requise'}),
    annee_academique_id: z.number({ required_error: 'Année académique requise' }),

})