import { FastifyReply, FastifyRequest } from "fastify";

export async function ping(req: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({ message: "pong" });
}
