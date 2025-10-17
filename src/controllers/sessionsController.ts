import { Request, Response } from "express";
import { UserService } from "../services/userService.js";
import { IUser } from "../types/api.js";


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


  // Login de usuario
  static async login(req: Request, res: Response) {
	const { email, password } = req.body;

	//console.log(req.body);

	if (!email || !password) {
	  return res.status(400).json({ success: false, message: "Email y contraseña son obligatorios" });
	}

	try {
	  // Verificar las credenciales del usuario
	  const user = await userService.findByEmail(email);

	  //console.log(user);
	  if (!user) {
		return res.status(401).json({ success: false, message: "Credenciales inválidas", data: null });
	  }


	  res.status(200).json({ success: true, message: "Login exitoso", data: user });
	} catch (error) {
	  console.error("Error en el login:", error);
	  res.status(500).json({ success: false, message: "Error en el login", data: null });
	}
  };

};
