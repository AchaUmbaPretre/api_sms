import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
    console.error('❌ Erreur attrapée :', err);
  
    const status = err.status || 500;
    const message = err.message || 'Erreur interne du serveur';
  
    res.status(status).json({ error: message });
  };
