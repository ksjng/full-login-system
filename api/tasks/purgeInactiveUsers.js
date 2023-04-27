import { prisma } from "../index.js";

import config from "../config.js";

setInterval(async () => {

    let lte = new Date() - config.purgeInactiveUsers.maxInactiveAccountAge;
    lte = new Date(lte).toISOString();

    await prisma.users.deleteMany({
        where: {
            AND: [
                {
                    status: 0
                },
                {
                    createdAt: { lte }
                }
            ]
        }
    });
    
}, 1000);