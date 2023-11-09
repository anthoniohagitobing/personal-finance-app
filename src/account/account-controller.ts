import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";
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
      // console.log(accounts);
      
      for (const account of accounts) {
        // const balance = await allRecordsController.getBalance(account.id);
        const balance = await recordIncomeExpenseModel.getNetChangeRecordIncomeExpense(account.id);
        account["balance"] = balance;
      }
      // console.log(accounts);

      res.status(200).send(JSON.stringify(accounts));
    } catch {
      res.status(500).send("Failed to get user");
    }
  },

  async getAccount(req: Request, res: Response): Promise<void> {
    try {
      const accountId: number = Number(req.params.accountId);
      const data = await accountModel.getAccount(accountId);

      res.status(200).send(JSON.stringify(data));
    } catch {
      res.status(500).send("Failed to get user");
    }
  },

  async updateAccount(req: Request, res: Response): Promise<void> {
    try {
      type AccountType = 'General' | 'Cash' | 'Bank Account' | 'Credit Card' | 'Electronic Money';
      type Currency = 'USD' | 'JYP' | 'IDR' | 'SGD' | 'EUR' | 'GBP' | 'AUD' | 'NZD' | 'HKD' | 'CHF' | 'CAD' | 'CNH'
  
      interface NewAccountData {
        accountId: number,
        accountName: string,
        currency: Currency,
        accountType: AccountType,
        note?: string | undefined,
      }
  
      const { accountId, accountName, currency, accountType, note }: NewAccountData = req.body;
      accountModel.updateAccount(accountId, accountName, currency, accountType, note);
      res.status(204).send("Account updated");
    } catch {
      res.status(400).send("Cannot update account");
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

      // console.log(userId);
      // console.log(typeof userId);
      // console.log(accountName);
      // console.log("currency", currency);
      // console.log("account type", accountType);
      // console.log(note);

      accountModel.createAccount(userId, accountName, currency, accountType, note);
      
      res.status(201).send("Account created");
    } catch {
      res.status(401).send("Cannot create account");
    }
  }
};