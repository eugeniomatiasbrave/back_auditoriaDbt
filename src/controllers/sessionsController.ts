import { Request, Response } from "express";
import { UserService } from "../services/userService.js";


const userService = new UserService();

export class SessionController {
  // Registro de usuario
  static async register(req: Request, res: Response) {
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
	  return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
	}

	try {
	  // Verificar si el usuario ya existe
	  const existingUser = await userService.getAll();
	
	  console.log(existingUser);

	  // Crear el nuevo usuario
	  const newUser = await userService.create({ firstName, lastName, email, password });
	  res.status(201).json({ success: true, user: newUser });
	} catch (error) {
	  console.error("Error en el registro:", error);
	  res.status(500).json({ success: false, message: "Error en el registro" });
	}
  }	
}