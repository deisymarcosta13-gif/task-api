import { Router } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import * as authController from "../controllers/auth.controller";
import * as taskController from "../controllers/task.controller";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mariana Acosta"
 *               email:
 *                 type: string
 *                 example: "mariana@example.com"
 *               password:
 *                 type: string
 *                 example: "miContrasena123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post("/auth/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicio de sesión
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "mariana@example.com"
 *               password:
 *                 type: string
 *                 example: "miContrasena123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/auth/login", authController.login);

/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: Ruta protegida de prueba
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso autorizado
 *       401:
 *         description: No autorizado
 */
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Ruta protegida ",
    user: (req as any).user
  });
});

//CRUD DE TAREAS
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - due_date
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Estudiar Node.js"
 *               description:
 *                 type: string
 *                 example: "Repasar conceptos de backend"
 *               due_date:
 *                 type: string
 *                 example: "2026-04-01"
 *     responses:
 *       201:
 *         description: Tarea creada
 *       401:
 *         description: No autorizado
 */
router.post("/tasks", authMiddleware, taskController.createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas del usuario autenticado
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *       401:
 *         description: No autorizado
 */
router.get("/tasks", authMiddleware, taskController.getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Detalle de la tarea
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/tasks/:id", authMiddleware, taskController.getTaskDetail);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               due_date:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pendiente, en curso, completada]
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 */
router.put("/tasks/:id", authMiddleware, taskController.updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/tasks/:id", authMiddleware, taskController.deleteTask);

export default router;

