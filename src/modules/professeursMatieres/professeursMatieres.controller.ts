import { Request, Response, NextFunction } from 'express';
import { profMatiereService } from './professeursMatieres.service';

export const profMatiereController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newProfMatiere = await profMatiereService.createWithAccount(req.body);
      res.status(201).json({
        message: 'Compte prof matiere créée avec succès',
        data: newProfMatiere,
      });
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profMatiere = await profMatiereService.findAll();
      res.status(200).json(profMatiere);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_professeur);
      const profMatiere = await profMatiereService.findById(id);
      res.status(200).json(profMatiere);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_professeurs_matieres);
      const updated = await profMatiereService.update(id, req.body);
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
      const id = parseInt(req.params.id_professeurs_matieres);
      await profMatiereService.delete(id);
      res.status(200).json({ message: 'Matiere supprimé' });
    } catch (error) {
      next(error);
    }
  },
};
