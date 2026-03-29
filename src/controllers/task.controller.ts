import { Response } from "express";
import * as taskService from "../services/task.service";
import { AuthRequest } from "../api/middlewares/auth.middleware";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, due_date } = req.body;

    const user = req.user;

    const result = await taskService.createTask(
      title,
      description,
      due_date,
      user.id
    );

    res.status(201).json({
      message: "Tarea creada",
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};