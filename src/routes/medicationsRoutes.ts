import { Router } from "express";
import MedicationController from "../controllers/medicationsController.js";

const router = Router();

router.get("/", MedicationController.getAllMedications); // GET /api/medications - Obtener todos los medicamentos

export default router;
