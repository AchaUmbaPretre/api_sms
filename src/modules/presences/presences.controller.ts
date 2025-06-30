import { Request, Response } from 'express';
import { presenceService } from './presences.service';
import { CreateAbsenceMotifSchema, CreateJourFerieSchema, CreatePresenceSchema } from './presences.validation';

export const presenceController = {
  async createPresence(req: Request, res: Response) {
    try {
      const validated = CreatePresenceSchema.parse(req.body);
      const presence = await presenceService.createPresence(validated);
      res.status(201).json(presence);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async createMotif(req: Request, res: Response) {
    try {
      const validated = CreateAbsenceMotifSchema.parse(req.body);
      const motif = await presenceService.createAbsenceMotif(validated);
      res.status(201).json(motif);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async createJourFerie(req: Request, res: Response) {
    try {
      const validated = CreateJourFerieSchema.parse(req.body);
      const jour = await presenceService.createJourFerie(validated);
      res.status(201).json(jour);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getPresencesParMois(req: Request, res: Response) {
    try {
      const id_eleve = parseInt(req.params.id_eleve);
      const { annee, mois } = req.query;

      if (!annee || !mois) {
        return res.status(400).json({ error: "annee et mois requis en query" });
      }

      const result = await presenceService.getPresencesParMois(
        id_eleve,
        parseInt(annee as string),
        parseInt(mois as string)
      );
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async getStatistiquesParEleve(req: Request, res: Response) {
    try {
      const id_eleve = parseInt(req.params.id_eleve);
      const result = await presenceService.getStatistiquesParEleve(id_eleve);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

getPresencesParClasseEtMois: async (req: Request, res: Response) => {
  try {
    const id_classe = parseInt(req.params.id_classe);
    const { annee, mois } = req.query;

    if (!annee || !mois) {
      return res.status(400).json({ error: 'annee et mois sont requis en query' });
    }

    const presences = await presenceService.getPresencesParClasseEtMois(
      id_classe,
      parseInt(annee as string),
      parseInt(mois as string)
    );

    res.json(presences);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

};
