import Fastify from "fastify";
import cors from "@fastify/cors";
import autoload from "@fastify/autoload";
import cookie from "@fastify/cookie";
import esso from "fastify-esso";
import { PrismaClient } from "@prisma/client";

import config from "./config.js";

import "./utils/generateActivationEmail.js";
import "./utils/generateRecoveryEmail.js";
import "./tasks/purgeInactiveUsers.js";

const fastify = Fastify({
    trustProxy: true,
    ignoreTrailingSlash: true
});

fastify.register(cors);
fastify.register(cookie, { secret: config.auth.secret });
fastify.register(esso({ secret: config.auth.secret }));
fastify.register(autoload, { dir: "./api/routes" });

const prisma = new PrismaClient();

(async () => {
    try {
        const { port, host } = config;
        await fastify.listen({ port, host });
        console.log(`Fastify server is running on ${host}:${port}.`);
    } catch(err) {
        console.error(err.stack);
        process.exit(1);
    }
})();

export { prisma }