import { Request, Response, NextFunction } from 'express';
import { parentService } from './parent.service';

export const parentController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newParent = await parentService.createWithAccount(req.body);
      res.status(201).json({
        message: 'Compte parent créé avec succès',
        data: newParent,
      });
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const parents = await parentService.findAll();
      res.status(200).json(parents);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_parent);
      const parent = await parentService.findById(id);
      res.status(200).json(parent);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_parent);
      const updated = await parentService.update(id, req.body);
      res.status(200).json({
        message: 'Parent mis à jour',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_parent);
      await parentService.delete(id);
      res.status(200).json({ message: 'Parent supprimé' });
    } catch (error) {
      next(error);
    }
  },
};
