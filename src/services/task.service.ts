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