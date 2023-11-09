import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from "express";
import recordIncomeExpenseModel from './record-income-expense-model';

const prisma = new PrismaClient();

export default {
  async createRecordIncomeExpense(req: Request, res: Response): Promise<void> {
    try {
      interface NewRecordIncomeExpense {
        accountId: number,
        transactionType: string,
        title: string,
        dateTime: string,
        category: string,
        inputType: string,
        amount: number
      }

      const { accountId, transactionType, title, dateTime, category, inputType, amount }: NewRecordIncomeExpense = req.body;
      // console.log(accountId, transactionType, title, dateTime, category, inputType, amount);

      recordIncomeExpenseModel.createRecordIncomeExpense(accountId, transactionType, title, dateTime, category, inputType, amount);

      res.status(201).send("Record created");
    } catch {
      res.status(401).send("Cannot create record");
    }
  }
};