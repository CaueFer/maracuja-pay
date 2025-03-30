import Fastify from "fastify";
import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(authRoutes, { prefix: "/auth" });

const start = async () => {
  try {
    await fastify.listen({ port: 4001 });
    console.log("Server listening on port 4001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
