import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from "express";
import accountModel from "./account-model";
import recordIncomeExpenseModel from '../record/record-income-expense-model';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export default {
  async getAllAccounts(req: Request, res: Response): Promise<void> {
    try {
      interface Account {
        id: number;
        accountName: string;
        currency: string;
        accountType: string;
        balance?: Decimal | number | null;
      }

      const userId: number = Number(req.params.userId);
      // console.log(userId);
      const accounts: Account[] = await accountModel.getAllAccounts(userId)
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
      // console.log(accounts);
      
      for (const account of accounts) {
        const sumObject = await recordIncomeExpenseModel.getNetChangeRecordIncomeExpense(account.id)
          .then(async (res) => {
            await prisma.$disconnect();
            return res;
          })
          .catch(async (err) => {
            await prisma.$disconnect();
            process.exit(1);
          });
        console.log(sumObject);
        if (sumObject[0]) account["balance"] = sumObject[0]._sum.amount;
        else account["balance"] = 0;
      }
      console.log(accounts);

      res.status(200).send(JSON.stringify(accounts));
    } catch {
      res.status(500).send("Failed to get user");
    }
  },

  async createAccount(req: Request, res: Response): Promise<void> {
    try {
      type AccountType = 'General' | 'Cash' | 'Bank Account' | 'Credit Card' | 'Electronic Money';
      type Currency = 'USD' | 'JYP' | 'IDR' | 'SGD' | 'EUR' | 'GBP' | 'AUD' | 'NZD' | 'HKD' | 'CHF' | 'CAD' | 'CNH'

      interface NewAccountData {
        userId: number,
        accountName: string,
        currency: Currency,
        accountType: AccountType,
        note?: string | undefined,
      }

      const { userId, accountName, currency, accountType, note }: NewAccountData = req.body;

      accountModel.createAccount(userId, accountName, currency, accountType, note)
        .then(async (res) => {
          await prisma.$disconnect();
        })
        .catch(async (err) => {
          await prisma.$disconnect();
          process.exit(1);
        });
      
      res.status(201).send("Account created");
    } catch {
      res.status(401).send("Cannot create account");
    }
  }
};