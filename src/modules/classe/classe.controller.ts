import { Request, Response, NextFunction } from "express";
import { classeService, filieresService } from "./classe.service";

export const classeController = {
    async create(req:Request, res:Response, next: NextFunction): Promise<void>  {
        try {
            await classeService.createdClasse(req.body);
            res.status(201).json({
                message: "La salle de classe  a été créee avec succès."
            })
        } catch (error) {
            next(error)
        }
    },

    async findAll(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const classe = await classeService.findAll();
            res.status(200).json(classe)
        } catch (error) {
            next(error)
        }
    }
}

export const filiereController = {
    async create(req:Request, res:Response, next: NextFunction): Promise<void>  {
        try {
            await filieresService.createdFiliere(req.body);
            res.status(201).json({
                message: "La filiere a été créee avec succès."
            })
        } catch (error) {
            next(error)
        }
    },

    async findAll(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const filiere = await filieresService.findAll();
            res.status(200).json(filiere)
        } catch (error) {
            next(error)
        }
    }
}