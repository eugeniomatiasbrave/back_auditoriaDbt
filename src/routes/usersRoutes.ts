import { Router } from "express";
import UserController from "../controllers/usersController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/profile", verifyToken, UserController.getUserProfile);

export default router;