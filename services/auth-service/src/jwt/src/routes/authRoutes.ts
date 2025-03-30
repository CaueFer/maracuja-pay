import fastify, { FastifyInstance } from "fastify";
import { loginUser, protectRoute, registerUser } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/register", registerUser);
  fastify.post("/login", loginUser);
  fastify.get("/protected", { preHandler: verifyToken }, protectRoute);
};
