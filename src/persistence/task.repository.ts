import { db } from "./mysql.connection";

/**
 * Nota:
 * MySQL usa "?" para parámetros:
 * SELECT * FROM users WHERE email = ?
 * 
 * PostgreSQL usa "$1":
 * SELECT * FROM users WHERE email = $1
 */

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

// Actualizar tarea por id
export const updateTaskById = async (
  id: number,
  title: string,
  description: string,
  due_date: string,
  status: "pendiente" | "en curso" | "completada",
  user_id: number
) => {
  const query = `
    UPDATE tasks 
    SET title = ?, description = ?, due_date = ?, status = ?
    WHERE id = ? AND user_id = ?
  `;

  const [result]: any = await db.execute(query, [
    title,
    description,
    due_date,
    status,
    id,
    user_id
  ]);

  return result.affectedRows; // 1 si actualizó, 0 si no encontró
};

//eliminar tarea por id

export const deleteTaskById = async (id: number) => {
  const query = "DELETE FROM tasks WHERE id = ?";
  const [result]: any = await db.execute(query, [id]);
  return result.affectedRows; // retorna 0 si no se eliminó nada
};