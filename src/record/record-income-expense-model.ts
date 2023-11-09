import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async createRecordIncomeExpense(accountId: number, transactionType: string, title: string, dateTime: string, category: string, inputType: string, amount: number) {
    async function prismaCreateRecordIncomeExpense(accountId: number, transactionType: string, title: string, dateTime: string, category: string, inputType: string, amount: number) {
      return await prisma.recordIncomeExpense.create({
        data: {
          accountId: accountId,
          transactionType: transactionType,
          title: title,
          dateTime: dateTime,
          category: category,
          inputType: inputType,
          amount: amount,
        }
      });
    }
    const data = await prismaCreateRecordIncomeExpense(accountId, transactionType, title, dateTime, category, inputType, amount)
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

  async getAllRecordIncomeExpense(accountId: number) {
    async function prismaGetAllRecordIncomeExpense(accountId: number) {
      return await prisma.recordIncomeExpense.findMany({
        where: {
          accountId: accountId,
        },
        orderBy: {
          dateTime: 'desc',
        },
        select: {
          accountId: true,
          transactionType: true,
          title: true,
          dateTime: true,
          category: true,
          inputType: true,
          amount: true,
        }
      });
    }
    const data = await prismaGetAllRecordIncomeExpense(accountId)
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

  async getNetChangeRecordIncomeExpense(accountId: number) {
    async function prismaRecordIncomeExpense(accountId: number) {
      return await prisma.recordIncomeExpense.groupBy({
        by: ['accountId'],
        where: {
          accountId: accountId,
        },
        _sum: {
          amount: true,
        },
      });
    }
    const data = await prismaRecordIncomeExpense(accountId)
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
    if (data[0]) return data[0]._sum.amount;
    else return 0;
  }
};