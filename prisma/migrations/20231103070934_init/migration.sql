-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "currency" VARCHAR(5) NOT NULL,
    "type" VARCHAR(25) NOT NULL,
    "note" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordIncomeExpense" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "inputType" VARCHAR(15) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "RecordIncomeExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordMutation" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "Note" TEXT,

    CONSTRAINT "RecordMutation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordTransfer" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "Note" TEXT,
    "sourceAccountId" INTEGER NOT NULL,
    "sourceAmount" DECIMAL(65,30) NOT NULL,
    "destinationAccountId" INTEGER NOT NULL,
    "destinationAmount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "RecordTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordIncomeExpense" ADD CONSTRAINT "RecordIncomeExpense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordMutation" ADD CONSTRAINT "RecordMutation_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordTransfer" ADD CONSTRAINT "RecordTransfer_sourceAccountId_fkey" FOREIGN KEY ("sourceAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordTransfer" ADD CONSTRAINT "RecordTransfer_destinationAccountId_fkey" FOREIGN KEY ("destinationAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
