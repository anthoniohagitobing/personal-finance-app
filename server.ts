// IMPORTING MODULES
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";


// IMPORTING DATABASE CONTROLLER
import accountController from "./src/user/user-controller";

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

app.get('/user/:email', accountController.getUser);
  // to access: http://localhost:8080/user/abc@gmail.com
  // this has parameter "id" that must be specified
  // will return an object containing the user id, email, first name and last name
  // ex: {"id":31,"email":"client1@gmail.com","firstName":"firstname123","lastName":"lastname123"}


app.post('/user', accountController.registerUser);
  // to access: http://localhost:8080/user
  // body, raw, json
  // ex: {"email": "testemail", "firstName": "firstname", "lastName": "lastname"}


// INITIATE SERVER
const PORT: string = process.env.PORT || "8000";
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
