import { verify } from "hcaptcha";
import bcrypt from "bcrypt";

import { prisma } from "../../../../index.js";
import getIpAddr from "../../../../utils/getIpAddr.js";
import generateActivationEmail from "../../../../utils/generateActivationEmail.js";

import config from "../../../../config.js";


export default async (fastify, options) => {

    fastify.post("/register", async (req, res) => {

        const { username, email, captcha } = req.body;

        if(!username || !email ||
            req.body.password.length > 72 ||
            !/^[A-Za-z0-9_]{4,20}$/.test(username)
        ) return res.send({
            success: false,
            error: "Form filled incorrectly"
        });

        const isCaptchaVerified = await verify(config.hCaptchaSecret, captcha);

        if(!isCaptchaVerified.success) return res.send({
            success: false,
            error: "Invalid captcha"
        });

        if(config.excludes.blockedUsernames.includes(username.toLowerCase()) || config.excludes.blockedEmails.includes(email.toLowerCase())) return res.send({
            success: false,
            error: "Username and/or email on blocklist"
        });

        const password = await bcrypt.hash(req.body.password, 12);
        const ipAddress = getIpAddr(req);

        try {
            await prisma.users.create({
                data: { username, email, password, ipAddress }
            });

        } catch(err) {
            if(err.code == "P2002") return res.send({
                success: false,
                error: "Username and/or email already taken"
            });
        }

        await generateActivationEmail(email);

        res.send({ success: true });

    });
    
}
