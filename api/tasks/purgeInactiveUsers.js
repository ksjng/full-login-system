import { prisma } from "../index.js";

import config from "../config.js";

setInterval(async () => {

    let gte = new Date() - config.purgeInactiveUsers.maxInactiveAccountAge;
    gte = new Date(gte).toISOString();

    await prisma.users.deleteMany({
        where: {
            AND: [
                {
                    status: 0
                },
                {
                    createdAt: { gte }
                }
            ]
        }
    });
    
}, 1000);