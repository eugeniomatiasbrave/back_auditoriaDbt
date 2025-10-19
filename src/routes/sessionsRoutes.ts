
import { Router } from "express";
import SessionController from "../controllers/sessionsController.js";

const router = Router();

router.post("/register", SessionController.register); // Registro de usuario
router.post("/login", SessionController.login); // Login de usuario
router.post("/logout", SessionController.logout); // Logout de usuario

export default router;