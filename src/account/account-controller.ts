import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from "express";
import accountModel from "./account-model";

const prisma = new PrismaClient();

export default {
  async getAllAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = Number(req.params.userId);
      // console.log(userId);
      const data = await accountModel.getAllAccount(userId)
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

      res.status(200).send(JSON.stringify(data));
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