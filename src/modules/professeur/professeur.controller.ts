import { Request, Response, NextFunction } from 'express';
import { professeurService, specialiteService } from './professeur.service';

export const professeurController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newProfesseur = await professeurService.createWithAccount(req.body);
      res.status(201).json({
        message: 'Compte professeur créé avec succès',
        data: newProfesseur,
      });
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const professeur = await professeurService.findAll();
      res.status(200).json(professeur);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_professeur);
      const professeur = await professeurService.findById(id);
      res.status(200).json(parent);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_professeur);
      const updated = await professeurService.update(id, req.body);
      res.status(200).json({
        message: 'Professeur mis à jour',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_professeur);
      await professeurService.delete(id);
      res.status(200).json({ message: 'Professeur supprimé' });
    } catch (error) {
      next(error);
    }
  },
};

export const specialiteController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newSpecialite = await specialiteService.createWithAccount(req.body);
      res.status(201).json({
        message: 'Compte specialité créée avec succès',
        data: newSpecialite,
      });
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const specialite = await specialiteService.findAll();
      res.status(200).json(specialite);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_professeur);
      const specialite = await specialiteService.findById(id);
      res.status(200).json(specialite);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_specialite);
      const updated = await specialiteService.update(id, req.body);
      res.status(200).json({
        message: 'Specialité mise à jour',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_specialite);
      await specialiteService.delete(id);
      res.status(200).json({ message: 'Specialité supprimée' });
    } catch (error) {
      next(error);
    }
  },
};

