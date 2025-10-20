import bcrypt from "bcryptjs";
import { IUser } from "../types/api";

export default class AuthService {
  async hashPassword(password: string): Promise<string> {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salts);
  };
  async validatePassword(password: string, plainUserFound: IUser): Promise<boolean> {
    return bcrypt.compare(password, plainUserFound.password ?? "");
  };
};