import { Request, Response, NextFunction } from 'express';
import { eleveParentService, eleveService } from './eleve.service';

export const eleveController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newEleve = await eleveService.createWithAccount(req.body);
      res.status(201).json({
        message: 'Compte élève créé avec succès',
        data: newEleve,
      });
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const eleves = await eleveService.findAll();
      res.status(200).json(eleves);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_eleve);
      const eleve = await eleveService.findById(id);
      res.status(200).json(eleve);
    } catch (error) {
      next(error);
    }
  },

  // 🔹 Mettre à jour un élève
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_eleve);
      const updated = await eleveService.update(id, req.body);
      res.status(200).json({
        message: 'Élève mis à jour',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_eleve);
      await eleveService.delete(id);
      res.status(200).json({ message: 'Élève supprimé' });
    } catch (error) {
      next(error);
    }
  },
};


export const eleveParentController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newEleveParent = await eleveParentService.createWithAccount(req.body);
      res.status(201).json({
        message: 'Compte élève parent créé avec succès',
        data: newEleveParent,
      });
    } catch (error) {
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const elevesParents = await eleveParentService.findAll();
      res.status(200).json(elevesParents);
    } catch (error) {
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_eleve_parent);
      const eleveParent = await eleveParentService.findById(id);
      res.status(200).json(eleveParent);
    } catch (error) {
      next(error);
    }
  },

  // 🔹 Mettre à jour un élève
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_eleve_parent);
      const updated = await eleveParentService.update(id, req.body);
      res.status(200).json({
        message: 'Élève parent mis à jour',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id_eleve_parent);
      await eleveParentService.delete(id);
      res.status(200).json({ message: 'Élève parent supprimé' });
    } catch (error) {
      next(error);
    }
  },
};