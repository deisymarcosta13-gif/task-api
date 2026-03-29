import { db } from "./mysql.connection";

export const createUser = async (name: string, email: string, password: string) => {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const [result]: any = await db.execute(query, [name, email, password]);
  return result.insertId;
};

export const findUserByEmail = async (email: string) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows]: any = await db.execute(query, [email]);
  return rows[0];
};