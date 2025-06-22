import { z } from 'zod';

export const createEleveSchema = z.object({
  prenom: z.string().min(2, 'Le prénom est requis'),
  email: z.string().email('Email invalide'),
  motDePasse: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères'),
  date_naissance: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: 'Date de naissance invalide' }
  ),
  sexe: z.enum(['M', 'F']).optional(),
  adresse: z.string().min(3, 'Adresse requise'),
  annee_academique_id: z.number({ required_error: 'Année académique requise' }),
});
