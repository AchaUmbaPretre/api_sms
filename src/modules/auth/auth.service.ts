import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET = process.env.JWT_SECRET || 'secret';

export const authService = {
  hashPassword: (password: string) => bcrypt.hash(password, 10),

  comparePassword: (plain: string, hash: string) => bcrypt.compare(plain, hash),

  generateToken: (payload: object) =>
    jwt.sign(payload, SECRET, { expiresIn: '7d' }),

  verifyToken: (token: string) => jwt.verify(token, SECRET),
};
