import nodemailer from "nodemailer";

import fs from "node:fs/promises";

import config from "../config.js";

const { host, user, pass, name } = config.smtp;


const send = async (to, subject, html) => {

    try {

        const transporter = nodemailer.createTransport({
            host,
            port: 465,
            secure: true,
            auth: { user, pass }
        });

        await transporter.sendMail({
            from: `${name} <${user}>`,
            to, subject, html
        });

        return true;
        
    } catch(err) {
        console.error(err);
        return false;
    }

}


const sendActivationEmail = async (to, activationUrl) => {

    const htmlContent = await fs.readFile("api/emails/activateAccount.html", "utf8");
    const finalHtml = htmlContent.replaceAll("{ACTIVATION_URL}", activationUrl);

    return await send(to, "Verify your email address", finalHtml);

}


const sendRecoveryEmail = async (to, recoveryUrl) => {

    const htmlContent = await fs.readFile("api/emails/recoverPassword.html", "utf8");
    const finalHtml = htmlContent.replaceAll("{RECOVERY_URL}", recoveryUrl);

    return await send(to, "Recover password request", finalHtml);

}


const sendPasswordChangedEmail = async (to) => {

    const finalHtml = await fs.readFile("api/emails/passwordChanged.html", "utf8");

    return await send(to, "Your password has been changed", finalHtml);

}


export { sendActivationEmail, sendRecoveryEmail, sendPasswordChangedEmail }