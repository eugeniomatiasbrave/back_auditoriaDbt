import { Router } from "express";
import { MedicationController } from "../controllers/medicationsController.js";

const router = Router();

// GET /api/medications - Obtener todos los medicamentos
router.get("/", MedicationController.getAllMedications);

export default router;
