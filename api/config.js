export default {
    host: "0.0.0.0",
    port: 3001,
    appBaseUrl: "http:/localhost:3000", // Needed for links in emails
    hCaptchaSecret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    defaultAvatar: "identicon", // https://en.gravatar.com/site/implement/images/
    smtp: {
        host: "smtp.example.com",
        user: "no-reply@example.com",
        pass: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        name: "Your company name"
    },
    auth: {
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // Some long, randomized string
    },
    activationEmails: {
        timeBetweenSending: 5 * 60 * 1000, // 5 minutes
        tokenLifetime: 24 * 60 * 60 * 1000, // 24 hours
        scheduleInterval: 10 * 60 * 1000 // 10 minutes
    },
    recoveryEmails: {
        timeBetweenSending: 5 * 60 * 1000, // 5 minutes
        tokenLifetime: 24 * 60 * 60 * 1000, // 24 hours
        scheduleInterval: 10 * 60 * 1000 // 10 minutes
    },
    purgeInactiveUsers: {
        maxInactiveAccountAge: 24 * 60 * 60 * 1000, // 24 hours
        scheduleInterval: 10 * 60 * 1000 // 10 minutes
    },
    excludes: { // Use lower case
        blockedUsernames: ["admin", "root"],
        blockedEmails: ["admin@example.com"]
    }
}
