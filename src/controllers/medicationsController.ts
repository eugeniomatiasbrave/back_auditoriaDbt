import { Request, Response } from "express";
import { MedicationService } from "../services/medicationService.js";

const medicationService = new MedicationService();

export class MedicationController {
  static async getAllMedications(req: Request, res: Response) {
    // GET /api/medications
    try {
      const medications = await medicationService.getAll();
      res.status(200).json({
        success: true,
        message: "Medicamentos obtenidos exitosamente",
        data: medications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener medicamentos",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };

  static async getMedicationsByCategory(req: Request, res: Response) {

    const categoryId = typeof req.params.categoryId === "string" ? req.params.categoryId : undefined;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId es requerido y debe ser un string",
      });
    }

    try {
      const medications = await medicationService.getByCategory(categoryId);
      res.status(200).json({
        success: true,
        message: "Medicamentos obtenidos exitosamente",
        data: medications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener medicamentos",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };
};