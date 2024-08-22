import { PrismaClient } from "@prisma/client";

// types for prisma declared it global so it can work throughout our code
declare global{
    var prisma:PrismaClient | undefined
}

//following will either search for globalThisPrisma or creats new Prisma client
const client =globalThis.prisma || new PrismaClient()

//checks if we are in devlopment  if yes then we set the  globalThis.prisma = client
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client
export default client;