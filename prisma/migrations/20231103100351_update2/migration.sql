/*
  Warnings:

  - Added the required column `transactionType` to the `RecordIncomeExpense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecordIncomeExpense" ADD COLUMN     "transactionType" VARCHAR(10) NOT NULL;
