import { Router } from "express";
import UserController from "../controllers/usersController.js";

const router = Router();

router.get("/", UserController.getAllUsers); // Obtener todos los usuarios
router.get("/:id", UserController.getUserById); // Obtener un usuario por ID
router.put("/:id", UserController.updateUser); // Actualizar un usuario existente
router.delete("/:id", UserController.deleteUser); // Eliminar un usuario

export default router;