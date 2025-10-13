import { Request, Response } from "express";

export class MedicationController {
  // GET /api/medications - Obtener todos los medicamentos
  static async getAllMedications(req: Request, res: Response) {
    try {
      // Simular la obtención de medicamentos desde una base de datos

      // Responder con la lista de medicamentos

      const medications = [
        {
          id: 1,
          name: "Metformina",
          category: "Antidiabético",
          description:
            "Usada para mejorar el control del azúcar en sangre en personas con diabetes tipo 2.",
          drug: "Metformina 500mg",
        },
        {
          id: 2,
          name: "Insulina Humana",
          category: "Hormona",
          description:
            "Usada para controlar los niveles de azúcar en sangre en personas con diabetes tipo 2.",
          drug: "Insulina Humana 100 UI/mL",
        },
        {
          id: 3,
          name: "Insulina Glargina",
          category: "Hormona",
          description:
            "Usada para controlar los niveles de azúcar en sangre en personas con diabetes.",
          drug: "Insulina Glargina 100 UI/mL",
        },
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
