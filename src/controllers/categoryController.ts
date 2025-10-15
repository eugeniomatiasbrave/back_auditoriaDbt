import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService.js";

const categoryService = new CategoryService();

export class CategoryController {
  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      res.status(500).json({ message: "Error al obtener las categorías" });
    }
  }

}
