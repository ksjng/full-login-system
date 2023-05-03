import { prisma } from "../../../../index.js";
import { activations } from "../../../../utils/generateActivationEmail.js";
import { sendEmailChangedEmail } from "../../../../utils/sendEmail.js";


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

        const { email, type, details } = entry;

        let user;

        if(!type) user = await prisma.users.findFirst({
            where: {
                AND: [
                    { email },
                    { status: 0 }
                ]
            }
        });

        else if(type == 1) user = await prisma.users.findFirst({
            where: {
                AND: [
                    { email: details.oldEmail },
                    { status: 1 }
                ]
            }
        });

        if(!user) return res.send({
            success: false,
            error: "This account is already activated or does not exist"
        });

        let updateUser;

        if(!type) updateUser = await prisma.users.update({
            where: { email },
            data: { status: 1 }
        });

        else if(type == 1) updateUser = await prisma.users.update({
            where: { email: details.oldEmail },
            data: { email }
        });

        if(!updateUser.status) return res.send({
            success: false,
            error: "Could not update account data"
        });

        if(type == 1) await sendEmailChangedEmail(details.oldEmail, email);

        res.send({ success: true });

    });

}