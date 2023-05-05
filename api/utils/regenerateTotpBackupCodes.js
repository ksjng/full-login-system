import crypto from "crypto";

import { prisma } from "../index.js";


export default async (username) => {

    const codes = [];

    for(let i = 0; i < 8; i++) 
        codes.push(crypto.randomBytes(4).toString("hex"));

    await prisma.users.update({
        where: { username },
        data: { 
            totpBackupCodes: JSON.stringify(codes)
        }
    });

    return codes;

}