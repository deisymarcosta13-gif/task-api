import mysql from "mysql2/promise";
import { env } from "../config/env";

export const db = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

/**
 * Nota:
 * Este proyecto está configurado con MySQL (mysql2).
 * 
 * Para usar PostgreSQL:
 * - Reemplazar mysql2 por pg
 * - Cambiar createPool por Pool de pg
 * 
 * Ejemplo:
 * 
 * import { Pool } from "pg";
 * 
 * export const db = new Pool({
 *   host: process.env.DB_HOST,
 *   port: Number(process.env.DB_PORT),
 *   user: process.env.DB_USER,
 *   password: process.env.DB_PASSWORD,
 *   database: process.env.DB_NAME,
 * });
 */