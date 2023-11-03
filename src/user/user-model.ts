import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default {
  getUser() {        
    return prisma.user.findMany();
  }
};