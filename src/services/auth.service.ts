import { createUser, findUserByEmail } from "../persistence/user.repository";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const register = async (name: string, email: string, password: string) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Usuario ya existe");
  }

  const hashedPassword = await hashPassword(password);

  const userId = await createUser(name, email, hashedPassword);

  return { userId };
};

export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new Error("Credenciales inválidas");
  }

  const token = generateToken({
    id: user.id,
    email: user.email
  });

  return { token };
};