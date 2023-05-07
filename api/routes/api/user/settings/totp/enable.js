import { prisma } from "../../../../../index.js";
import regenerateTotpBackupCodes from "../../../../../utils/regenerateTotpBackupCodes.js";


export default async (fastify, options) => {

    fastify.requireAuthentication(fastify);

    fastify.post("/enable", async (req, res) => {

        const { secret, token } = req.body;

        const { username } = req.auth;

        const isVerified = fastify.totp.verify({ secret, token });
        
        if(!isVerified) return res.send({ 
            success: false,
            error: "Wrong TOTP token"
        });

        await prisma.users.update({
            where: { username },
            data: { totpSecret: secret }
        });

        const codes = await regenerateTotpBackupCodes(username);

        res.send({ 
            success: true,
            data: { codes }
        });

    });

}