
import { Router } from "express";
import { SessionController } from "../controllers/sessionsController.js";

const router = Router();

// Ruta para registro
router.post("/register", SessionController.register);

export default router;
