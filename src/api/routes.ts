import { Router } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import * as authController from "../controllers/auth.controller";
import * as taskController from "../controllers/task.controller";

const router = Router();

router.post("/tasks", authMiddleware, taskController.createTask);

//rutas de autenticacion
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// validacion de proteccion de  rutas
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Ruta protegida ",
    user: (req as any).user
  });
});

//CRUD DE TAREAS

router.post("/tasks", authMiddleware, taskController.createTask);
export default router;