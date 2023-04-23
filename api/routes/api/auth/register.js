export default async (fastify, options) => {

    fastify.post("/register", async (req, res) => {

        res.send({
            success: true,
            data: req.body
        });

    });
    
}
