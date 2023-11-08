import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  async createRecordIncomeExpense(accountId: number, transactionType: string, title: string, dateTime: string, category: string, inputType: string, amount: number) {
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
  },

  async getAllRecordIncomeExpense(accountId: number) {
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
  },

  async getNetChangeRecordIncomeExpense(accountId: number) {
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
};