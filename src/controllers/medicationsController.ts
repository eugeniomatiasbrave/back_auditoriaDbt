import { Request, Response } from "express";
import MedicationService from "../services/medicationService.js";

const medicationService = new MedicationService();

export default class MedicationController {
  // GET /api/medications
  static async getAllMedications(req: Request, res: Response) {
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
  }

  static async getMedicationsByCategory(req: Request, res: Response) {
    const categoryId = req.params.categoryId as string;
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
  }

  // GET /api/medications/:id
  static async getMedicationById(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id es requerido",
      });
    }

    try {
      const medication = await medicationService.getById(id);
      if (medication) {
        res.status(200).json({
          success: true,
          message: "Medicamento obtenido exitosamente",
          data: medication,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Medicamento no encontrado",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener medicamento",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  // POST /api/medications
  static async createMedication(req: Request, res: Response) {
    try {
      const {
        name,presentation,potency,drug,laboratory,coverage,units,troquel,categoryId,description,
      } = req.body;

      if (!name || !presentation || !potency || !drug || !laboratory || !coverage || !units || !troquel || !categoryId || !description) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son requeridos",
        });
      }

      const medicationData = {
        name,
        presentation,
        potency,
        drug,
        laboratory,
        coverage,
        units,
        troquel,
        categoryId,
        description,
      };

      const newMedication = await medicationService.create(medicationData);
      res.status(201).json({
        success: true,
        message: "Medicamento creado exitosamente",
        data: newMedication,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear medicamento",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  // PUT /api/medications/:id
  static async updateMedication(req: Request, res: Response) {
    const id = req.params.id;
    const { name, presentation, potency, drug, laboratory, coverage, units, troquel, categoryId, description } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id es requerido",
      });
    }

 if (!name || !presentation || !potency || !drug || !laboratory || !coverage || !units || !troquel || !categoryId || !description) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos",
      });
    }
    
    const medicationData = {
      name,
      presentation,
      potency,
      drug,
      laboratory,
      coverage,
      units,
      troquel,
      categoryId,
      description,
    };

    try {
      const updatedMedication = await medicationService.update(
        id,
        medicationData
      );
      res.status(200).json({
        success: true,
        message: "Medicamento actualizado exitosamente",
        data: updatedMedication,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al actualizar medicamento",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }

  // DELETE /api/medications/:id
  static async deleteMedication(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id es requerido",
      });
    }
    try {
      await medicationService.delete(id);
      res.status(200).json({
        success: true,
        message: "Medicamento eliminado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar medicamento",
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
