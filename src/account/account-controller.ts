import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from "express";
import accountModel from "./account-model";

const prisma = new PrismaClient();

export default {
  async createAccount
}