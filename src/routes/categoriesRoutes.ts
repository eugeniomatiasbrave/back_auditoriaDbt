import { Router } from "express";
import CategoryController from "../controllers/categoriesController.js";
import MedicationController from "../controllers/medicationsController.js";

const router = Router();

router.get("/", CategoryController.getAllCategories);//Obtener todas las categorías
router.get("/:categoryId/medications",MedicationController.getMedicationsByCategory);//Obtener medicamentos por categoría..

export default router;