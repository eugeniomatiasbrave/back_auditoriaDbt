import { Request, Response } from "express";		
import { UserService } from "../services/userService.js";
//import { IUser } from "../types/api.js";

const userService = new UserService();

export class UserController {
  // Obtener todos los usuarios
  static async getAllUsers(req: Request, res: Response) {
	try {
	  const users = await userService.getAll();
	  res.json(users);
	} catch (error) {
	  res.status(500).json({ message: "Error al obtener los usuarios", error });
	}
  }
  
  // Obtener un usuario por ID	
  static async getUserById(req: Request, res: Response) {
	const { id } = req.params;

	if (typeof id !== "string") {
	  return res.status(400).json({ message: "ID de usuario no proporcionado o inválido" });
	}

	try {
	  const user = await userService.getById(id);
	  if (user) {
		res.json(user);
	  } else {
		res.status(404).json({ message: "Usuario no encontrado" });
	  }
	} catch (error) {
	  res.status(500).json({ message: "Error al obtener el usuario", error });
	}
  }
  
  // Actualizar un usuario existente
  static async updateUser(req: Request, res: Response) {
	const { id } = req.params;
	const userData = req.body;

	if (typeof id !== "string") {
	  return res.status(400).json({ message: "ID de usuario no proporcionado o inválido" });
	}

	try {
	  const updatedUser = await userService.update(id, userData);
	  if (updatedUser) {
		res.json(updatedUser);
	  } else {
		res.status(404).json({ message: "Usuario no encontrado" });
	  }
	} catch (error) {
	  res.status(500).json({ message: "Error al actualizar el usuario", error });
	}
  }

  // Eliminar un usuario
  static async deleteUser(req: Request, res: Response) {
	const { id } = req.params;

	if (typeof id !== "string") {
	  return res.status(400).json({ message: "ID de usuario no proporcionado o inválido" });
	}

	try {
	  const deleted = await userService.delete(id);
	  if (deleted) {
		res.json({ message: "Usuario eliminado correctamente" });
	  } else {
		res.status(404).json({ message: "Usuario no encontrado" });
	  }
	} catch (error) {
	  res.status(500).json({ message: "Error al eliminar el usuario", error });
	}
	  }
}