import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header) return res.status(401).json({ error: 'Token manquant' });

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();

    } catch {
        res.status(401).json({ error: 'Token invalide' });
    }

}
