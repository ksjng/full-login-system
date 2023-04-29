import bcrypt from "bcrypt";

import { prisma } from "../../../../index.js";
import { recoveries } from "../../../../utils/generateRecoveryEmail.js";

export default async (fastify, options) => {

    fastify.post("/set-password", async (req, res) => {

        const { password, token } = req.body;

        if(!password || !token) return res.send({
            success: false,
            error: "Form filled incorrectly"
        });

        const entry = recoveries.find(item => item.token == token);
        
        if(!entry) return res.send({
            success: false,
            error: "This link is invalid or expired"
        });

        const { email } = entry;

        const hashedPassword = await bcrypt.hash(password, 12);

        const updateUser = await prisma.users.update({
            where: { email },
            data: { password: hashedPassword}
        });

        if(!updateUser.status) return res.send({
            success: false,
            error: "Could not update account data"
        });

        res.send({ success: true });

    });
    
}
