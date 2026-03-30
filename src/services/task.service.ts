import * as taskRepo from "../persistence/task.repository";
import { NotFoundError } from "../errors/not-found.error";

export const createTask = async (
  title: string,
  description: string,
  due_date: string,
  user_id: number
) => {
  const taskId = await taskRepo.createTask(
    title,
    description,
    due_date,
    user_id
  );

  return { taskId };
};

export const getTasks = async (user_id: number) => {
  return await taskRepo.getTasksByUser(user_id);
};

export const getTask = async (taskId: number, userId: number) => {
  const task = await taskRepo.getTaskById(taskId);

  if (!task) {
    throw new NotFoundError("Tarea no encontrada");
  }

  if (task.user_id !== userId) {
    throw new NotFoundError("Tarea no pertenece al usuario");
  }

  return task;
};

//actualizar tarea por id

export const updateTask = async (
  taskId: number,
  userId: number,
  title: string,
  description: string,
  due_date: string,
  status: "pendiente" | "en curso" | "completada"
) => {
  // Primero, verificamos que la tarea existe y pertenece al usuario
  const task = await taskRepo.getTaskById(taskId);
  if (!task) throw new NotFoundError("Tarea no encontrada");
  if (task.user_id !== userId)
    throw new NotFoundError("Tarea no pertenece al usuario");

  const affectedRows = await taskRepo.updateTaskById(
    taskId,
    title,
    description,
    due_date,
    status,
    userId
  );

  if (affectedRows === 0)
    throw new Error("No se pudo actualizar la tarea");

  return { taskId };
};

//eliminar tarea por  id
export const deleteTask = async (taskId: number, userId: number) => {
  const task = await taskRepo.getTaskById(taskId);

  if (!task) {
    throw new NotFoundError("Tarea no encontrada");
  }

  if (task.user_id !== userId) {
    throw new NotFoundError("Tarea no pertenece al usuario");
  }

  const deleted = await taskRepo.deleteTaskById(taskId);
  return { deleted };
};