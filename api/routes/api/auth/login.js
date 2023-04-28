import bcrypt from "bcrypt";

import { prisma } from "../../../index.js";
import getIpAddr from "../../../utils/getIpAddr.js";


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
            error: "This account does not exist"
        });

        if(!user.status) return res.send({
            success: false,
            error: "Verify your email to log in"
        });

        else if(user.status == 2) res.send({
            success: false,
            error: "Your account is suspended"
        })

        const ipAddress = getIpAddr(req);

        const updateUser = await prisma.users.update({
            where,
            data: { 
                lastLoginAt: new Date(),
                ipAddress 
            }
        });

        res.send({ success: true });

    });
    
}