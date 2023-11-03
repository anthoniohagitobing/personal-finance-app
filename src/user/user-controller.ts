import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from "express";
import userModel from "./user-model";

const prisma = new PrismaClient()

export default {
  async getUser(req: Request, res: Response): Promise<any> {
    try {
      const data = await userModel.getUser()
        .then(async (res) => {
          await prisma.$disconnect();
          // console.log(res);
          return res;
        })
        .catch(async (err) => {
          // console.error(e)
          await prisma.$disconnect();
          process.exit(1);
          return err;
        });

      res.status(200).send(data);
    } catch {
      res.status(401).send("Invalid Username or Password");
    }
  }
};








