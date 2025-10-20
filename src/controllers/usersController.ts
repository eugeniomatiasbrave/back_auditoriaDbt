import { Request, Response } from "express";
import services from "../services/index.js";
import { IUser } from "../types/api.js";

const { UserService } = services;
const userService = new UserService();

// Extiende la interfaz Request para incluir 'user'
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}



export default class UserController {
  // Obtener el perfil del usuario autenticado
  static async getUserProfile(req: Request, res: Response) {

    const user = req.user; // Asumiendo que el middleware de autenticación añade el usuario a la solicitud
    if (!user) {
      return res.status(401).json({ success: false, message: "Usuario no autenticado" });
    }

    const userFound = await userService.getById(String(user.id));

    if (!userFound) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    const userPlain = userFound.toJSON ? userFound.toJSON() : userFound;

    return res.status(200).json({
      success: true,
      data: {
        id: userPlain.id,
        firstName: userPlain.firstName,
        lastName: userPlain.lastName,
        email: userPlain.email,
      },
    });
  };
};
