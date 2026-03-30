import { Response } from "express";
import * as taskService from "../services/task.service";
import { AuthRequest } from "../api/middlewares/auth.middleware";

/**
 * Crea una nueva tarea asociada al usuario autenticado
 * 
 * @param req - Request que contiene title, description y due_date en el body
 * @param res - Response de Express
 * @returns Respuesta JSON con el ID de la tarea creada
 * 
 * @example
 * POST /api/tasks
 * Authorization: Bearer <token>
 * {
 *   "title": "Estudiar TypeScript",
 *   "description": "Repasar tipos y interfaces",
 *   "due_date": "2026-04-01"
 * }
 * 
 * @throws Error si ocurre un problema al crear la tarea
 */
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

/**
 * Obtiene todas las tareas del usuario autenticado
 * 
 * @param req - Request que contiene el usuario autenticado (req.user)
 * @param res - Response de Express
 * @returns Lista de tareas del usuario
 * 
 * @example
 * GET /api/tasks
 * Authorization: Bearer <token>
 * 
 * @throws Error si ocurre un problema al obtener las tareas
 */
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

/**
 * Obtiene el detalle de una tarea específica por ID
 * 
 * @param req - Request que contiene el ID de la tarea en params
 * @param res - Response de Express
 * @returns Datos de la tarea solicitada
 * 
 * @example
 * GET /api/tasks/1
 * Authorization: Bearer <token>
 * 
 * @throws NotFoundError si la tarea no existe o no pertenece al usuario
 */
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


/**
 * Actualiza una tarea existente del usuario autenticado
 * 
 * @param req - Request que contiene el ID en params y los datos a actualizar en el body
 * @param res - Response de Express
 * @returns Confirmación de la tarea actualizada
 * 
 * @example
 * PUT /api/tasks/1
 * Authorization: Bearer <token>
 * {
 *   "title": "Actualizar backend",
 *   "description": "Agregar validaciones",
 *   "due_date": "2026-04-02",
 *   "status": "en curso"
 * }
 * 
 * @throws NotFoundError si la tarea no existe o no pertenece al usuario
 */
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

/**
 * Elimina una tarea del usuario autenticado
 * 
 * @param req - Request que contiene el ID de la tarea en params
 * @param res - Response de Express
 * @returns Confirmación de eliminación
 * 
 * @example
 * DELETE /api/tasks/1
 * Authorization: Bearer <token>
 * 
 * @throws NotFoundError si la tarea no existe o no pertenece al usuario
 */
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