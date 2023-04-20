export default async (fastify, options) => {

    fastify.get("/api/test", async (req, res) => {

        res.send({
            success: true
        });

    });
    
}
