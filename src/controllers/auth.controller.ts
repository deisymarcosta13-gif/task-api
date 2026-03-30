import { Request, Response } from "express";
import * as authService from "../services/auth.service";

/**
 * Registra un nuevo usuario en el sistema
 * 
 * @param req - Request de Express que contiene name, email y password en el body
 * @param res - Response de Express
 * @returns Respuesta JSON con el ID del usuario creado
 * 
 * @example
 * POST /api/auth/register
 * {
 *   "name": "Mariana",
 *   "email": "mariana@example.com",
 *   "password": "123456"
 * }
 * 
 * @throws Error si el usuario ya existe o hay datos inválidos
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await authService.register(name, email, password);

    res.status(201).json({
      message: "Usuario creado",
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};

/**
 * Inicia sesión de un usuario existente
 * 
 * @param req - Request de Express que contiene email y password en el body
 * @param res - Response de Express
 * @returns Respuesta JSON con el token JWT
 * 
 * @example
 * POST /api/auth/login
 * {
 *   "email": "mariana@example.com",
 *   "password": "123456"
 * }
 * 
 * @throws Error si las credenciales son incorrectas
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json({
      message: "Login exitoso",
      data: result
    });
  } catch (error: any) {
    res.status(401).json({
      message: error.message
    });
  }
};