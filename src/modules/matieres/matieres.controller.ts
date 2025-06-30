import { Request, Response, NextFunction } from 'express';
import { matiereService } from './matieres.service';

export const matiereController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newMatiere = await matiereService.createWithAccount(req.body);
      res.status(201).json({
        message: 'Compte matiere créée avec succès',
        data: newMatiere,
      });
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const matiere = await matiereService.findAll();
      res.status(200).json(matiere);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_professeur);
      const matiere = await matiereService.findById(id);
      res.status(200).json(matiere);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_matiere);
      const updated = await matiereService.update(id, req.body);
      res.status(200).json({
        message: 'Matiere mise à jour',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_matiere);
      await matiereService.delete(id);
      res.status(200).json({ message: 'Matiere supprimé' });
    } catch (error) {
      next(error);
    }
  },
};
