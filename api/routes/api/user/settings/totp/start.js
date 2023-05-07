export default async (fastify, options) => {

    fastify.requireAuthentication(fastify);

    fastify.get("/start", async (req, res) => {

        const { username } = req.auth;

        const totpCredentials = fastify.totp.generateSecret();
        const secret = totpCredentials.ascii;
        
        const { base32 } = totpCredentials;

        const qrcode = await fastify.totp.generateQRCode({ secret });

        res.send({ 
            success: true,
            data: { secret, base32, qrcode }
        });

    });

}