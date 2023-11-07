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
  }
};