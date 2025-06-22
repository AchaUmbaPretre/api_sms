import { authService } from "../auth/auth.service";
import { prisma }  from './../../config/prisma';


const createWithEleve = async (
    userData: any,
    eleveData: any
  ) => {
    const hashed = await authService.hashPassword(userData.motDePasse);
  
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          ...userData,
          motDePasse: hashed,
        },
      });
  
      const eleve = await tx.eleve.create({
        data: {
          ...eleveData,
          userId: user.id,
        },
      });
  
      return { user, eleve };
    });
  }

  export default createWithEleve;