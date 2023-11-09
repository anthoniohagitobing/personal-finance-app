import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
import recordIncomeExpenseModel from './record-income-expense-model';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export default {
  async getAllRecords(req: Request, res: Response): Promise<void> {
    try {
      interface AllRecords {
          accountId: number;
          transactionType: string;
          title: string;
          dateTime: Date;
          category: string;
          inputType: string;
          amount: Decimal;
      }
      // console.log(req.params.accountId);
      const accountId: number = Number(req.params.accountId);
      // console.log(accountId);
      const data: AllRecords[] = await recordIncomeExpenseModel.getAllRecordIncomeExpense(accountId);

      res.status(200).send(JSON.stringify(data));
    } catch {
      res.status(500).send("Failed to get records");
    }
  },

  // async getBalance(accountId: number) {
  //   const sumObject = await recordIncomeExpenseModel.getNetChangeRecordIncomeExpense(accountId)
  //     .then(async (res) => {
  //       await prisma.$disconnect();
  //       return res;
  //     })
  //     .catch(async (err) => {
  //       await prisma.$disconnect();
  //       process.exit(1);
  //     });
  //   // console.log(sumObject);
  //   if (sumObject[0]) return sumObject[0]._sum.amount;
  //   else return 0;
  // },
}