// IMPORT MODULES
import { PrismaClient } from '@prisma/client';

// CREATE OBJECT INSTANCE
const prisma = new PrismaClient()

// CREATE SEED FUNCTION
const timestamp = new Date().toISOString();

function generateRandomDate(from: Date, to: Date): string {
  return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime())).toISOString();
}

async function main() {
  // Delete initial data
  const deleteRecordTransfer = await prisma.recordTransfer.deleteMany({});
  const deleteRecordMutation = await prisma.recordMutation.deleteMany({});
  const deleteRecordIncomeExpense = await prisma.recordIncomeExpense.deleteMany({});
  const deleteAccount = await prisma.account.deleteMany({});
  const deleteUsers = await prisma.user.deleteMany({});

  // Input data
  const user = await prisma.user.createMany({
    data: [
      {
        id: 1,
        email: 'user1@gmail.com',
        firstName: 'user1FirstName',
        lastName: 'user1LastName',
      }
    ]
  });
  const account = await prisma.account.createMany({
    data: [
      {
        id: 1,
        accountName: 'cash account',
        currency: 'JYP',
        accountType: 'Cash',
        note: 'testcash',
        userId: 1
      },
      {
        id: 2,
        accountName: 'bank account',
        currency: 'JYP',
        accountType: 'Bank Account',
        note: 'testbank',
        userId: 1
      }
    ]
  });
  const recordIncomeExpense = await prisma.recordIncomeExpense.createMany({
    data: [
      {
        id: 1,
        accountId: 1,
        transactionType: 'income',
        title: 'cash income expense 1',
        dateTime: generateRandomDate(new Date(2023, 9, 1), new Date()),
        category: 'shopping',
        inputType: 'global',
        amount: 5000,
      },
      {
        id: 2,
        accountId: 1,
        transactionType: 'income',
        title: 'cash income expense 2',
        dateTime: generateRandomDate(new Date(2023, 9, 1), new Date()),
        category: 'food',
        inputType: 'global',
        amount: 8000,
      },
    ]
  });
  const recordMutation = await prisma.recordMutation.createMany({
    data: [
      {
        id: 1,
        accountId: 1,
        title: 'cash mutation 1',
        dateTime: generateRandomDate(new Date(2023, 9, 1), new Date()),
        amount: 8000,
        note: 'askdlf;ajsd'
      },
      {
        id: 2,
        accountId: 1,
        title: 'cash mutation 2',
        dateTime: generateRandomDate(new Date(2023, 9, 1), new Date()),
        amount: 15000,
        note: 'asaasdfasdfasdf;ajsd'
      },
    ]
  });
  const recordTransfer = await prisma.recordTransfer.createMany({
    data: [
      {
        id: 1,
        title: 'cash transfer 1',
        dateTime: generateRandomDate(new Date(2023, 9, 1), new Date()),
        note: 'asaasdfasdfasdf;ajsd',
        sourceAccountId: 1,
        sourceAmount: 3000,
        destinationAccountId: 2,
        destinationAmount: 3000,
      },
      {
        id: 2,
        title: 'cash transfer 2',
        dateTime: generateRandomDate(new Date(2023, 9, 1), new Date()),
        note: 'asaasdfasdfasdf;ajsd',
        sourceAccountId: 1,
        sourceAmount: 1500,
        destinationAccountId: 2,
        destinationAmount: 1500,
      },
    ]
  });
}

// INITIATING SEED
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });