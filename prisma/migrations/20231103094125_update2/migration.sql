/*
  Warnings:

  - You are about to drop the column `Note` on the `RecordMutation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RecordMutation" DROP COLUMN "Note",
ADD COLUMN     "note" TEXT;
