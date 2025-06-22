import { Request, Response, NextFunction } from 'express';
import { anneeAcademiqueService } from './anneeAcademique.service'

export const anneeAcademiqueController = {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newAnneeAcademique = await anneeAcademiqueService.createAnneeAcademique(req.body);
            res.status(201).json({
                message: "L'année academique a été créee avec succès."
            })
        } catch (error) {
            next(error)
        }
    },

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const anneeAca = await anneeAcademiqueService.findAll();
            res.status(200).json(anneeAca)
        } catch (error) {
            next(error);
        }
    }
}