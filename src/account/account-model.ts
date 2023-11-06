import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async getAllAccount(userId: number) {
    return await prisma.account.findMany({
      where: {
        userId: userId, 
      },
      select: {
        id: true,
        accountName: true,
        currency: true,
        accountType: true,
      }
    });
  },

  async createAccount(userId: number, accountName: string, currency: string, accountType: string, note: string | undefined) {
    return await prisma.account.create({
      data: {
        userId: userId,
        accountName: accountName,
        currency: currency,
        accountType: accountType,
        note: note,
      }
    });
  }
};