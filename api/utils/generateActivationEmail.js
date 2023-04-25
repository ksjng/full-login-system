import crypto from "crypto";

import { sendActivationEmail } from "./sendEmail.js";

import config from "../config.js";

const activations = [];

export default async (email) => {

    const token = crypto.randomBytes(32).toString("hex");
    const activationUrl = `${config.appBaseUrl}/activate?token=${token}`;

    const sendEmail = await sendActivationEmail(email, activationUrl);
    if(!sendEmail) return "EMAIL_SENDING_ERROR";

    activations.push({
        token, email,
        sentDate: new Date()
    });

    const sorted = activations.filter(item => item.email == email).sort((a, b) => a.sentDate - b.sentDate);
    if(!sorted.length) return "TRY_AGAIN";

    if(new Date() - sorted[0].sentDate < config.activationEmails.timeBetweenSending) return "WAIT_BEFORE_REQUEST";

    return "SENT";

}

setInterval(() => {
    for(const i in activations) {
        if(new Date() - activations[i].sentDate >= config.activationEmails.tokenLifetime)
            delete activations[i];
    }

}, config.activationEmails.scheduleInterval);