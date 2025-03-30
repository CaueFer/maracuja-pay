import { FastifyInstance } from "fastify";
import { ping } from "../controllers/api-gateway.controller";

export async function router(fastify: FastifyInstance) {
  fastify.get("/ping", ping);
}
