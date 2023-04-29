import { verify } from "hcaptcha";

import { prisma } from "../../../../index.js";
import generateRecoveryEmail from "../../../../utils/generateRecoveryEmail.js";

import config from "../../../../config.js";


export default async (fastify, options) => {

    fastify.post("/reset-request", async (req, res) => {

        const { email, captcha } = req.body;

        if(!email || !captcha) return res.send({
            success: false,
            error: "Form filled incorrectly"
        });
        
        const isCaptchaVerified = await verify(config.hCaptchaSecret, captcha);

        if(!isCaptchaVerified.success) return res.send({
            success: false,
            error: "Invalid captcha"
        });

        const user = await prisma.users.findFirst({
            where: { email }
        });

        if(!user) return res.send({
            success: false,
            error: "Could not found any account associated with provided email"
        });

        const generateStatus = await generateRecoveryEmail(email);

        if(generateStatus !== "SUCCESS") return res.send({
            success: false,
            error: generateStatus
        });

        res.send({ success: true });

    });
    
}
