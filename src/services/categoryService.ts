import { CategoryModel } from "../models/category.model.js";

export class CategoryService {
// Obtener todas las categorías
  async getAll() {
    return await CategoryModel.findAll();
  }
}
