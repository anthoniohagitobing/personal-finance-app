// IMPORTING MODULES
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";


// IMPORTING DATABASE CONTROLLER
import userController from "./src/user/user-controller";
import accountController from "./src/account/account-controller";
import recordIncomeExpenseController from "./src/record/record-income-expense-controller";
import allRecordsController from "./src/record/all-records-controller";

// CONFIGURE MODULES
const app: Express = express();
dotenv.config({path: "./.env"}); 

// USING MIDDLEWARE
app.use(express.json());
app.use(cors());
// test update

// ENDPOINTS
// Test
const age: number = 20;
app.get('/', (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server + test4: ${age}`);
});

// User
app.get('/user/:email', userController.getUser);
  // to access: http://localhost:8080/user/abc@gmail.com
  // this has parameter "id" that must be specified
  // will return an object containing the user id, email, first name and last name
  // ex: {id:31, email:"client1@gmail.com", firstName:"firstname123", lastName:"lastname123"}
app.post('/user', userController.createUser);
  // to access: http://localhost:8080/user
  // body, raw, json
  // ex: {email: "testemail", firstName: "firstname", lastName: "lastname"}

// Account
app.get('/account/:accountId', accountController.getAccount);
app.get('/accounts/:userId', accountController.getAllAccounts);
  // to access: http://localhost:8080/account/1
  // this has parameter "userId" that must be specified
  // this will return all account belonging to an account
  // will return an array of objects containing the account id, account name, currency, account type
  // ex: {id:31, email:"client1@gmail.com", firstName:"firstname123", lastName:"lastname123"}
app.post('/account', accountController.createAccount);
// app.post('/account', (req, res) => {
//   console.log(req.body);
// });
  // to access: http://localhost:8080/account/
  // body, raw, json
  // ex: {userId: 1, accountName: "accountName", currency: "currency", accountType: "accountType", note: "note"};

// Record 
app.post('/record-income-expense', recordIncomeExpenseController.createRecordIncomeExpense);
  // to access: http://localhost:8080/record-income-expense/
  // body, raw, json
  // ex: accountId: 3, amount: 50, category: "Salary", dateTime: "2023-11-07T02:49:30.962Z", inputType: "Global", title: "asdf", transactionType: "Income"
app.get('/all-records/:accountId', allRecordsController.getAllRecords);
  // to access: http://localhost:8080/all-records/3
  // this has parameter "accountId" that must be specified
  // this will return all records belonging to an account
  // will return an array of objects containing the account id, transaction type, title, dateTime, category, inputType, amount
  // ex: {id:31, email:"client1@gmail.com", firstName:"firstname123", lastName:"lastname123"}

// INITIATE SERVER
const PORT: string = process.env.PORT || "8000";
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
