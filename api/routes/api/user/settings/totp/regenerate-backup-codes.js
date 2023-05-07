import { prisma } from "../../../../../index.js";
import regenerateTotpBackupCodes from "../../../../../utils/regenerateTotpBackupCodes.js";


export default async (fastify, options) => {

    fastify.requireAuthentication(fastify);

    fastify.get("/regenerate-backup-codes", async (req, res) => {

        const { username } = req.auth;

        const codes = await regenerateTotpBackupCodes(username);

        await prisma.users.update({
            where: { username },
            data: { totpBackupCodes: JSON.stringify(codes) }
        });

        res.send({ 
            success: true,
            data: { codes }
        });

    });

}