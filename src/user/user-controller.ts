import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from "express";
import userModel from "./user-model";

const prisma = new PrismaClient()

export default {
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const email: string = req.params.email
      const data = await userModel.getUser(email)
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

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      interface user {
        email: string,
        firstName: string,
        lastName: string,
      }

      const { email, firstName, lastName }: user = req.body;

      userModel.registerUser(email, firstName, lastName)
        .then(async (res) => {
          await prisma.$disconnect();
          // console.log(res);
        })
        .catch(async (err) => {
          // console.error(e)
          await prisma.$disconnect();
          process.exit(1);
        });

      res.status(201).send("Account created in backend database");
    } catch {
      res.status(401).send("Cannot register new user");
    }
  }
};








