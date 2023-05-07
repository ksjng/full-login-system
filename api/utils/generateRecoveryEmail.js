import crypto from "node:crypto";

import { sendRecoveryEmail } from "./sendEmail.js";

import config from "../config.js";

const recoveries = [];


export default async (email) => {

    const sorted = recoveries.filter(item => item.email == email).sort((a, b) => a.sentDate - b.sentDate);

    if((sorted.length > 1) && (new Date() - sorted[0].sentDate < config.recoveryEmails.timeBetweenSending)) return "You must wait a while before sending new email";

    const token = crypto.randomBytes(32).toString("hex");
    const recoveryUrl = `${config.appBaseUrl}/recover?token=${token}`;

    const sendEmail = await sendRecoveryEmail(email, recoveryUrl);
    if(!sendEmail) return "Failed to send email";

    recoveries.push({
        token, email,
        sentDate: new Date()
    });

    return "SUCCESS";

}

setInterval(() => {
    for(const i in recoveries) {
        if(new Date() - recoveries[i].sentDate >= config.recoveryEmails.tokenLifetime)
            delete recoveries[i];
    }

}, config.recoveryEmails.scheduleInterval);

export { recoveries }