import { Request, Response, NextFunction } from 'express';
import createWithEleve from './user.service';

export const createUserWithEleve = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userData, eleveData } = req.body;
  
      const newUserWithEleve = await createWithEleve(userData, eleveData);
  
      res.status(201).json(newUserWithEleve);
    } catch (err) {
      next(err);
    }
  };
  