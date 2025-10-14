// Servicio para la gestión de medicamentos
import { MedicationModel } from "../models/medication.model.js"; // ⬅️ Agregar .js

export class MedicationService {
  // Obtener todos los medicamentos
  async getAll() {
    return await MedicationModel.findAll();
  }
}
