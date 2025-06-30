import { Request, Response, NextFunction } from "express";
import { notesService, periodeService } from "./notes.service";
import { parse } from "dotenv";

export const notesController = {
    async create(req:Request, res:Response, next: NextFunction) : Promise<void> {
        try {
            await notesService.createdNotes(req.body);
            res.status(201).json({
                message: 'La note a été enregistée avec succes'
            })
        } catch (error) {
            next(error)
        }
    },

    async findAll(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const note = await notesService.findAll();
            res.status(200).json(note)
        } catch (error) {
            next()
        }
    },

    async findById(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const id = parseInt(req.params.id_note);
            const note = await notesService.findById(id);
            res.status(200).json(note);

        } catch (error) {
            next(error);
        }
    },

    async  update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id_note);
            const updated = await notesService.update(id, req.body);
            res.status(200).json({
                message: 'Note mise à jour',
                data: updated,
            });
        } catch (error) {
            next(error);
        }
    },
      async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const id = parseInt(req.params.id_note);
          await notesService.delete(id);
          res.status(200).json({ message: 'Note supprimée' });
        } catch (error) {
          next(error);
        }
      },
}

export const periodeController = {
    async create(req:Request, res:Response, next: NextFunction) : Promise<void> {
        try {
            await periodeService.createdPeriode(req.body);
            res.status(201).json({
                message: 'La periode a été enregistée avec succes'
            })
        } catch (error) {
            next(error)
        }
    },

    async findAll(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const periode = await periodeService.findAll();
            res.status(200).json(periode)
        } catch (error) {
            next()
        }
    }
}