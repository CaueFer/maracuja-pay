import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { createUser, findUserByUsername } from "../models/auth.model";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };

  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return reply.status(400).send({ message: "Usuário já existe" });
  }

  const newUser = await createUser(username, password);
  return reply
    .status(201)
    .send({ message: "Usuário registrado com sucesso", user: newUser });
};

const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };

  const user = findUserByUsername(username);
  if (!user) {
    return reply.status(400).send({ message: "Usuário não encontrado" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return reply.status(401).send({ message: "Credenciais inválidas" });
  }

  const payload = { username: user.username };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return reply.status(200).send({ message: "Login bem-sucedido", token });
};

const protectRoute = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply
    .status(200)
    .send({ message: "Rota protegida acessada com sucesso" });
};

export { registerUser, loginUser, protectRoute };
