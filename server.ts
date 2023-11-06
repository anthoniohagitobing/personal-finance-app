// IMPORTING MODULES
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";


// IMPORTING DATABASE CONTROLLER
import userController from "./src/user/user-controller";
import accountController from "./src/account/account-controller";

// CONFIGURE MODULES
const app: Express = express();
dotenv.config({path: "./.env"}); 

// USING MIDDLEWARE
app.use(express.json());
app.use(cors());


// ENDPOINTS
// Test
const age: number = 20;
app.get('/', (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server + test1: ${age}`);
});

// User
app.get('/user/:email', userController.getUser);
  // to access: http://localhost:8080/user/abc@gmail.com
  // this has parameter "id" that must be specified
  // will return an object containing the user id, email, first name and last name
  // ex: {"id":31,"email":"client1@gmail.com","firstName":"firstname123","lastName":"lastname123"}
app.post('/user', userController.createUser);
  // to access: http://localhost:8080/user
  // body, raw, json
  // ex: {"email": "testemail", "firstName": "firstname", "lastName": "lastname"}

// Account
app.get('/account/:userId', accountController.getAllAccount);
  // to access: http://localhost:8080/account/1
  // this has parameter "userId" that must be specified
  // this will return all account belonging to an account
  // will return an array of objects containing the account id, account name, currency, account type
  // ex: {"id":31,"email":"client1@gmail.com","firstName":"firstname123","lastName":"lastname123"}
app.post('/account', accountController.createAccount)
  // to access: http://localhost:8080/account/
  // body, raw, json
  // ex: {"userId": 1, "accountName": "accountName", "currency": "currency", "accountType": "accountType", "note": "note"};

// INITIATE SERVER
const PORT: string = process.env.PORT || "8000";
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
