import { FastifyReply, FastifyRequest } from "fastify";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

declare module 'fastify' {
  interface FastifyRequest {
    user?: string | JwtPayload;
  }
}

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const verifyToken = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers["authorization"];

  if (!token) {
    return reply
      .status(403)
      .send({ message: "Token de autenticação não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = decoded;
  } catch (err) {
    return reply.status(401).send({ message: "Token inválido ou expirado" });
  }
};

export { verifyToken };
