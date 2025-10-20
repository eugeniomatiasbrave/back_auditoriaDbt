import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config/config.env.js";

const SECRET = config.jwt.secret;

interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Soporta token por cookie o header
  const token =
    req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token no proporcionado",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    return res.status(401).json({
      success: false,
      message: "Token inválido",
    });
  }
};
