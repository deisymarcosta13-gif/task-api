import * as taskRepo from "../persistence/task.repository";

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