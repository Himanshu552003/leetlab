import {PrismaClient} from "../generated/prisma/index.js";


const globalForPrisma=globalThis;

// in nodejs we do not have window access we have globethis access , hence we creafte globalforprisma in which we put the prperty of  the gobalthis 


export const db =globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
