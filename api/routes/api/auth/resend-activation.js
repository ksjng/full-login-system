import { prisma } from "../../../index.js";
import generateActivationEmail from "../../../utils/generateActivationEmail.js";


export default async (fastify, options) => {

    fastify.post("/resend-activation", async (req, res) => {

        const { email } = req.body;

        if(!email) return res.send({
            success: false,
            error: "Form filled incorrectly"
        });

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
            error: "Could not found any inactive account associated with provided email"
        });

        const generateStatus = await generateActivationEmail(email);

        if(generateStatus !== "SUCCESS") return res.send({
            success: false,
            error: generateStatus
        });

        res.send({ success: true });

    });
    
}
