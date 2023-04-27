import { prisma } from "../../../index.js";
import { activations } from "../../../utils/generateActivationEmail.js";


export default async (fastify, options) => {

    fastify.get("/activate-email", async (req, res) => {

        const { token } = req.query;

        if(!token) return res.send({
            success: false,
            error: "Missing activation token"
        });

        const entry = activations.find(item => item.token == token);
        
        if(!entry) return res.send({
            success: false,
            error: "This link is invalid or expired"
        });

        const { email } = entry;

        const user = await prisma.users.findFirst({
            where: {
                AND: [
                    { email },
                    { status: 0 }
                ]
            }
        });

        if(!user) return res.send({
            success: false,
            error: "This account is already activated or does not exist"
        });

        const updateUser = await prisma.users.update({
            where: { email },
            data: { status: 1 }
        });

        if(!updateUser.status) return res.send({
            success: false,
            error: "Could not update account data"
        });

        res.send({ success: true });

    });

}