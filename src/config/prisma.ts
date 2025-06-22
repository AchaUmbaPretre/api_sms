import { PrismaClient } from '@prisma/client';

declare global {
  // Permet d'éviter plusieurs instances Prisma en développement avec hot reload
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['error', 'warn'], // optionnel : logs utiles en dev
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
