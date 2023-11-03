// IMPORTING MODULES
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";


// IMPORTING DATABASE CONTROLLER

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

// INITIATE SERVER
const PORT: string = process.env.PORT || "8000";
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
