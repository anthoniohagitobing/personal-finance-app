/*
  Warnings:

  - You are about to drop the column `Note` on the `RecordTransfer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RecordTransfer" DROP COLUMN "Note",
ADD COLUMN     "note" TEXT;
