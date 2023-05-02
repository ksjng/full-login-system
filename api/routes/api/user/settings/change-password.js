import bcrypt from "bcrypt";

import { prisma } from "../../../../index.js";
import { sendPasswordChangedEmail } from "../../../../utils/sendEmail.js";


export default async (fastify, options) => {

    fastify.requireAuthentication(fastify);

    fastify.post("/change-password", async (req, res) => {

        const { oldPassword, newPassword } = req.body;

        if(!oldPassword || !newPassword) return res.send({
            success: false,
            error: "Form filled incorrectly"
        });

        const { username } = req.auth;

        const user = await prisma.users.findFirst({
            where: { username }
        });

        const match = await bcrypt.compare(oldPassword, user.password);

        if(!match) return res.send({
            success: false,
            error: "Incorrect password"
        });

        const newHashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.users.update({
            where: { username },
            data: { password: newHashedPassword }
        });

        await sendPasswordChangedEmail(user.email);

        res.send({ success: true });

    });
    
}
