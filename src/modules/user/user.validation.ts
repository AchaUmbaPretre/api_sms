import { z } from 'zod';

export const createUserSchema = z.object({
  prenom: z.string().min(2),
  email: z.string().email(),
  motDePasse: z.string().min(6),
  role: z.enum(['admin', 'enseignant', 'eleve', 'parent']).optional(),
});
