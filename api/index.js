import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
    console.log("Test");
})();

export { prisma }