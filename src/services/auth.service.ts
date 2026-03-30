import { createUser, findUserByEmail } from "../persistence/user.repository";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

// Esquema para registro de usuario
const registerSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 }
  },
  required: ["name", "email", "password"],
  additionalProperties: false
};

// Función para validar que los datos sean validos 
const validateRegister = (data: any) => {
  const validate = ajv.compile(registerSchema);
  const valid = validate(data);
  if (!valid) {
    throw new Error("Datos inválidos: " + ajv.errorsText(validate.errors));
  }
};

export const register = async (name: string, email: string, password: string) => {
  validateRegister({ name, email, password });

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Ya existe un usuario con este correo");
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