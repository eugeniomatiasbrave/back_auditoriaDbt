import { Router } from "express";
import { CategoryController } from "../controllers/categoryController.js";
import { MedicationController } from "../controllers/medicationController.js";

const router = Router();

// GET /api/categories - Obtener todas las categorías
router.get("/", CategoryController.getAllCategories);

// GET /api/categories/:categoryId/medications - Obtener medicamentos por categoría
router.get(
  "/:categoryId/medications",
  MedicationController.getMedicationsByCategory
);

export default router;
