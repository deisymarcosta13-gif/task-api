import { db } from "./mysql.connection";

export const createTask = async (
  title: string,
  description: string,
  due_date: string,
  user_id: number
) => {
  const query = `
    INSERT INTO tasks (title, description, due_date, user_id)
    VALUES (?, ?, ?, ?)
  `;

  const [result]: any = await db.execute(query, [
    title,
    description,
    due_date,
    user_id
  ]);

  return result.insertId;
};

export const getTasksByUser = async (user_id: number) => {
  const query = "SELECT * FROM tasks WHERE user_id = ?";
  const [rows]: any = await db.execute(query, [user_id]);
  return rows;
};

export const getTaskById = async (id: number) => {
  const query = "SELECT * FROM tasks WHERE id = ?";
  const [rows]: any = await db.execute(query, [id]);
  return rows[0]; // retorna un solo objeto o undefined
};

