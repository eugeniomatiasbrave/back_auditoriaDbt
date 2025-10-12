import { Request, Response } from "express";

export class MedicationController {
  // GET /api/medications - Obtener todos los medicamentos
  static async getAllMedications(req: Request, res: Response) {
    try {
      // Aquí implementarías la lógica para obtener medicamentos de la base de datos
      const medications = [
        { id: 1, name: "Paracetamol", category: "Analgésico" },
        { id: 2, name: "Ibuprofeno", category: "Antiinflamatorio" },
      ];

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
  }
}
