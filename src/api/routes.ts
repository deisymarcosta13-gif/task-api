import { Router } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Ruta protegida ",
    user: (req as any).user
  });
});

export default router;