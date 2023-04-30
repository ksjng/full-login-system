export default async (fastify, options) => {

    fastify.requireAuthentication(fastify);

    fastify.get("/protected", async (req, res) => {

        res.send({
            success: true,
            user: req.auth
        });

    });
    
}
