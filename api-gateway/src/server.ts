import Fastify from "fastify";
import { router } from "./routes/router.js";

const fastify = Fastify({ logger: true });

// routes
fastify.register(router);

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    console.log("Server running on port 3001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
