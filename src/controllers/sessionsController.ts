import { Request, Response } from "express";
import services from "../services/index.js";
import { IUser } from "../types/api.js";
import { Model } from "sequelize";

const { AuthService, TokenService, UserService } = services;

const userService = new UserService();
const authService = new AuthService();
const tokenService = new TokenService();

export default class SessionController {
  static async register(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    try {
      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "El email ya está registrado" });
      }
      console.log(existingUser);

      const hashedPassword = await authService.hashPassword(password);
      // Crear el nuevo usuario
      const newUser = await userService.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        user: newUser,
      });
    } catch (error) {
      console.error("Error en el registro:", error);
      res
        .status(500)
        .json({ success: false, message: "Error en el registro", data: null });
    }
  }

  // Login de usuario
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    //console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email y contraseña son obligatorios",
      });
    }

    try {
      // Verificar si el usuario existe a través del email
      const userFound: Model<IUser> | null = await userService.findByEmail(email);

      //console.log(user);
      if (!userFound) {
        return res.status(401).json({
          success: false,
          message: "Usuario no encontrado",
          data: null,
        });
      }

      const plainUserFound = userFound.get({ plain: true }) as IUser; // Convertir a objeto plano

      const isPasswordValid = await authService.validatePassword(
        password, plainUserFound);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Contraseña incorrecta",
          data: null,
        });
      }

      const token = tokenService.generateToken(plainUserFound);

      console.log("Token generado:", token);

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // <-- aquí
          sameSite: "strict",
        })
        .status(200)
        .json({
          success: true,
          message: "Login exitoso",
          data: plainUserFound,
        });
    } catch (error) {
      console.error("Error en el login:", error);
      res
        .status(500)
        .json({ success: false, message: "Error en el login", data: null });
    }
  };

  static async logout(req: Request, res: Response) {
    try {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .status(200)
        .json({
          success: true,
          message: "Logout exitoso",
        });
    } catch (error) {
      console.error("Error en el logout:", error);
      res
        .status(500)
        .json({ success: false, message: "Error en el logout", data: null });
    }
  };
};
