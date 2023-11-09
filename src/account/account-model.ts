import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async getAllAccounts(userId: number) {
    async function prismaGetAllAccounts(userId: number) {
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
    }
    const data = await prismaGetAllAccounts(userId)
    .then(async (res) => {
      await prisma.$disconnect();
      // console.log(res);
      return res;
    })
    .catch(async (err) => {
      // console.error(e)
      await prisma.$disconnect();
      process.exit(1);
    });
    return data;
  },

  async getAccount(accountId: number) {
    async function prismaGetAccount(accountId: number) {
      return await prisma.account.findUnique({
        where: {
          id: accountId,
        },
        select: {
          id: true,
          accountName: true,
          currency: true,
          accountType: true,
        }
      });
    }
    const data = await prismaGetAccount(accountId)
      .then(async (res) => {
        await prisma.$disconnect();
        // console.log(res);
        return res;
      })
      .catch(async (err) => {
        // console.error(e)
        await prisma.$disconnect();
        process.exit(1);
      });
    return data;
  },
  
  async createAccount(userId: number, accountName: string, currency: string, accountType: string, note: string | undefined) {
    async function prismaCreateAccount(userId: number, accountName: string, currency: string, accountType: string, note: string | undefined) {
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
    const data = await prismaCreateAccount(userId, accountName, currency, accountType, note)
      .then(async (res) => {
        await prisma.$disconnect();
        // console.log(res);
        return res;
      })
      .catch(async (err) => {
        // console.error(e)
        await prisma.$disconnect();
        process.exit(1);
      });
    return data;
  }
};