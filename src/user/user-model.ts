import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async getUser(email: string) {        
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      }
    });
  },

  async registerUser(email: string, firstName: string, lastName: string) {
    return await prisma.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
      }
    });
  }
};