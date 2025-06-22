import { Request, Response, NextFunction } from "express";
import { classeService } from "./classe.service";

export const classeController = {
    async create(req:Request, res:Response, next: NextFunction): Promise<void>  {
        try {
            const newClasse = await classeService.createdClasse(req.body);
            res.status(201).json({
                message: "La salle de classe  a été créee avec succès."
            })
        } catch (error) {
            next(error)
        }
    },

    async findAll(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const classe = await classeService.findAll()
        } catch (error) {
            next(error)
        }
    }
}