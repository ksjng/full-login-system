import bcrypt from "bcrypt";

import { prisma } from "../../../../index.js";
import getIpAddr from "../../../../utils/getIpAddr.js";
import getGravatar from "../../../../utils/getGravatar.js";


export default async (fastify, options) => {

    fastify.post("/login", async (req, res) => {

        const { login, password } = req.body;

        if(!login || !password) return res.send({
            success: false,
            error: "Form filled incorrectly"
        });

        const where = login.includes("@") ? { email: login } : { username: login };

        const user = await prisma.users.findFirst({ where });

        if(!user) return res.send({
            success: false,
            error: "Incorrect login or password" // Prevents checking if account with provided username/email exists
        });

        const { username, email, status } = user;

        const match = await bcrypt.compare(password, user.password);

        if(!match) return res.send({
            success: false,
            error: "Incorrect login or password"
        });

        if(!status) return res.send({
            success: false,
            error: "Verify your email to log in"
        });

        else if(status == 2) res.send({
            success: false,
            error: "Your account is suspended"
        })

        const ipAddress = getIpAddr(req);

        await prisma.users.update({
            where,
            data: { 
                lastLoginAt: new Date(),
                avatarUrl: getGravatar(email),
                ipAddress 
            }
        });

        const token = await fastify.generateAuthToken({ username });

        res.setCookie("authorization", token, {
            path: "/",
            signed: true
        });

        res.send({ success: true });

    });
    
}