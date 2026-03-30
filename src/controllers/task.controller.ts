import { Response } from "express";
import * as taskService from "../services/task.service";
import { AuthRequest } from "../api/middlewares/auth.middleware";

//agregar tareas
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

//ver tareas

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    const tasks = await taskService.getTasks(user.id);

    res.json({
      message: "Lista de tareas",
      data: tasks
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

//ver detalle tarea por id 

export const getTaskDetail = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    // Convertimos req.params.id a string por seguridad y luego a número
    const taskId = parseInt(String(req.params.id), 10);

    const task = await taskService.getTask(taskId, user.id);

    res.json({
      message: "Detalle de la tarea",
      data: task,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
};


// Editar tarea por id
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const taskId = parseInt(String(req.params.id), 10);

    const { title, description, due_date, status } = req.body;

    const result = await taskService.updateTask(
      taskId,
      user.id,
      title,
      description,
      due_date,
      status
    );

    res.json({
      message: "Tarea actualizada",
      data: result,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

// eliminar tarea or id

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const taskId = parseInt(String(req.params.id), 10);

    const result = await taskService.deleteTask(taskId, user.id);

    res.json({
      message: "Tarea eliminada",
      data: result,
    });
  } catch (error: any) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
};