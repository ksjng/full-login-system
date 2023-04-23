import { verify } from "hcaptcha";
import bcrypt from "bcrypt";

import getIpAddr from "../../../utils/getIpAddr.js";

import config from "../../../config.js";

export default async (fastify, options) => {

    fastify.post("/register", async (req, res) => {

        const { username, email, password, captcha } = req.body;

        const isCaptchaVerified = await verify(config.hCaptchaSecret, captcha);

        if(!isCaptchaVerified.success) return res.send({
            success: false,
            error: "Invalid captcha"
        });

        const hashedPassword = await bcrypt.hash(password, 12);
        const ipAddress = getIpAddr(req);

        res.send({
            success: true
        });

    });
    
}
