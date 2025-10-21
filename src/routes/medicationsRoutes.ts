import { Router } from "express";
import MedicationController from "../controllers/medicationsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", MedicationController.getAllMedications); // GET /api/medications - Obtener todos los medicamentos
router.get("/:id", MedicationController.getMedicationById); // GET /api/medications/:id - Obtener un medicamento por ID
router.post("/", verifyToken, MedicationController.createMedication); // POST /api/medications - Crear un nuevo medicamento
router.put("/:id", verifyToken, MedicationController.updateMedication); // PUT /api/medications/:id - Actualizar un medicamento por ID
router.delete("/:id", verifyToken, MedicationController.deleteMedication); // DELETE /api/medications/:id - Eliminar un medicamento por ID

export default router;
