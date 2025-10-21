// Servicio para la gestión de medicamentos
import MedicationModel from "../models/medication.model.js";

export default class MedicationService {
  // Obtengo todos los medicamentos
  async getAll() {
    return await MedicationModel.findAll();
  };
  // Obtengo un medicamento por ID
  async getById(id: string) {
    return await MedicationModel.findByPk(id);
  }
  // Obtengo medicamentos por categoría
  async getByCategory(categoryId: string) {
    return await MedicationModel.findAll({ where: { categoryId } });
  }
  // Creo un nuevo medicamento
  async create(medicationData: any) {
    return await MedicationModel.create(medicationData);
  };
  // Actualizo un medicamento existente
  async update(id: string, medicationData: any) {
    const medication = await MedicationModel.findByPk(id);
    if (medication) {
      return await medication.update(medicationData);
    }
    throw new Error("Medication not found");
  };
  // Elimino un medicamento
  async delete(id: string) {
    const medication = await MedicationModel.findByPk(id);
    if (medication) {
      await medication.destroy();
      return;
    }
    throw new Error("Medication not found");
  };
};