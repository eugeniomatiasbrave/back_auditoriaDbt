// Servicio para la gestión de medicamentos
import { MedicationModel } from "../models/medication.model.js";

export class MedicationService {
  // Obtengo todos los medicamentos
  async getAll() {
    return await MedicationModel.findAll();
  };

  // Obtengo medicamentos por categoría
  async getByCategory(categoryId: string) {
    return await MedicationModel.findAll({ where: { categoryId } });
  }
}
