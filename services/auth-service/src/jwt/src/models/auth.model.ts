import bcrypt from "bcryptjs";
import { AuthUser } from "../common/types/auth.type";

let users: AuthUser[] = [];

const createUser = async (
  username: string,
  password: string
): Promise<AuthUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

const findUserByUsername = (username: string): AuthUser | undefined => {
  return users.find((user) => user.username === username);
};

export { createUser, findUserByUsername };
