import nodemailer from "nodemailer";

import fs from "node:fs/promises";

import config from "../config.js";

const { host, user, pass, name } = config.smtp;

const contents = {
    activateAccount: await fs.readFile("api/emails/activateAccount.html", "utf8"),
}

const send = async (to, subject, html) => {

    try {

        const transporter = nodemailer.createTransport({
            host,
            port: 465,
            secure: true,
            auth: { user, pass }
        });

        return await transporter.sendMail({
            from: `${name} <${user}>`,
            to, subject, html
        });
        
    } catch(err) {
        console.error(err);
    }

}

const sendActivationEmail = async (to, activationUrl) => {

    return await send(to, "Verify your email address", contents[activateAccount].replaceAll("{ACTIVATION_URL}", activationUrl))

}

export { sendActivationEmail }