import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prisma';
import { authService } from './auth.service';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, motDePasse } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    const validPassword = await authService.comparePassword(motDePasse, user.mot_de_passe);
    if (!validPassword) {
      res.status(401).json({ error: 'Mot de passe invalide' });
      return;
    }

    const token = authService.generateToken({ id: user.id, role: user.role });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prenom, email, motDePasse, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'Email déjà utilisé' });
      return;
    }

    const hashedPassword = await authService.hashPassword(motDePasse);

    const user = await prisma.user.create({
      data: {
        prenom,
        email,
        mot_de_passe: hashedPassword,
        role,
      },
    });

    const token = authService.generateToken({ id: user.id, role: user.role });

    res.status(201).json({
      message: 'Utilisateur enregistré avec succès',
      token,
      user: {
        id: user.id,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
