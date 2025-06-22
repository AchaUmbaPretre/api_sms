import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email requis',
      invalid_type_error: 'Email doit être une chaîne',
    })
    .email({ message: 'Format d’email invalide' }),

  motDePasse: z
    .string({
      required_error: 'Mot de passe requis',
      invalid_type_error: 'Mot de passe doit être une chaîne',
    })
    .min(6, { message: 'Mot de passe trop court (min. 6 caractères)' }),
});


export const registerSchema = z.object({
    prenom: z.string().min(2, 'Le prénom est requis'),
    email: z.string().email('Email invalide'),
    motDePasse: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
    role: z.enum(['admin', 'enseignant', 'eleve', 'parent'], {
      errorMap: () => ({ message: 'Rôle invalide' }),
    }),
  })