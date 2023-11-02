// IMPORTING MODULES
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client'

// CONFIGURE MODULES
const app: Express = express();
dotenv.config({path: "./.env"}); 

// TEST
const age: number = 20;


const prisma = new PrismaClient()

// async function main() {
  // ... you will write your Prisma Client queries here
  // await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@prisma.io',
  //     posts: {
  //       create: { title: 'Hello World' },
  //     },
  //     profile: {
  //       create: { bio: 'I like turtles' },
  //     },
  //   },
  // })

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // })
  // console.dir(allUsers, { depth: null })

  // const post = await prisma.post.update({
  //   where: { id: 1 },
  //   data: { published: true },
  // })
  // console.log(post)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

// USING MIDDLEWARE
app.use(express.json());
app.use(cors());

// ENDPOINTS
app.get('/', (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server + test1: ${age}`);
});

// INITIATE SERVER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
