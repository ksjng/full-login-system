import bcrypt from "bcrypt";

import { prisma } from "../../../../index.js";
import generateActivationEmail from "../../../../utils/generateActivationEmail.js";

export default async (fastify, options) => {

    fastify.requireAuthentication(fastify);

    fastify.post("/change-email", async (req, res) => {

        const { newEmail, password } = req.body;

        if(!newEmail || !password) return res.send({
            success: false,
            error: "Form filled incorrectly"
        });

        const { username } = req.auth;

        const user = await prisma.users.findFirst({
            where: { username }
        });

        const match = await bcrypt.compare(password, user.password);

        if(!match) return res.send({
            success: false,
            error: "Incorrect password"
        });

        const generateStatus = await generateActivationEmail(newEmail, 1, { oldEmail: user.email });

        if(generateStatus !== "SUCCESS") return res.send({
            success: false,
            error: generateStatus
        });

        res.send({ success: true });

    });

}
