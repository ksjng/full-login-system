export default async (fastify, options) => {

    fastify.get("/test", async (req, res) => {

        res.send({
            success: true
        });

    });
    
}
