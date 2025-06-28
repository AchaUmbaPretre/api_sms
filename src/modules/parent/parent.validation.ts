import { z } from 'zod';

export const parentRegisterSchema = z.object({
  prenom: z.string().min(1, 'Le prénom est requis'),
  email: z.string().email('Email invalide'),
  motDePasse: z.string().min(6, 'Le mot de passe doit avoir au moins 6 caractères'),
  nom: z.string().min(1, 'Le nom est requis'),
  postnom: z.string().min(1, 'Le postnom est requis'),
  role: z.enum(['parent']).optional(), // Sécurité : on force le rôle à "parent"
});

export type ParentRegisterInput = z.infer<typeof parentRegisterSchema>;
