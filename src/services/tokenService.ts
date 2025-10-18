import jwt from "jsonwebtoken";
import { IUser } from "../types/api";
import config from "../config/config.env.js";

const SECRET = config.jwt.secret;

export default class TokenService {
  generateToken(user: IUser): string {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    return token;
  
  }
}
