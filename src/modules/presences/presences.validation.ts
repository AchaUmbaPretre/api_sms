// schemas/presences.schemas.ts
import { z } from 'zod';

export const CreatePresenceSchema = z.object({
  id_eleve: z.number().int().min(1),
  date_presence: z.coerce.date(),
  status: z.enum(['present', 'absent', 'justifie']).optional(),
  id_absence_motifs: z.number().int().optional(),
  periode: z.enum(['matin', 'apresMidi']).optional(),
  created_by: z.number().int().min(1),
});

export const CreateAbsenceMotifSchema = z.object({
  libelle: z.string().min(2),
});

export const CreateJourFerieSchema = z.object({
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "La date est invalide ou mal formatée. Attendu : YYYY-MM-DD"
  }),
  nom: z.string().min(3),
});

