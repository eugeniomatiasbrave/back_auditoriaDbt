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
  }
}

/*
      const medications = [
        {
          id: 1,
          name: "INSULINA APIDRA SOLOSTAR",
          presentation: "100UI/ml lap.prellx5x3ml",
          potency: "100 UI/ml",
          drug: "insulina glulisina",
          laboratory: "Sanofi-Aventis",
          coverage: 100,
          units: 1500,
          troquel: "5524683",
          category: "Insulina de Acción Rápida",
          description:
            "Insulina glulisina de acción rápida para control glucémico después de las comidas. Actúa en 10-20 minutos con duración de 3-5 horas.",
        },
        {
          id: 2,
          name: "INSULINA BASAGLAR KWIKPEN",
          presentation: "100U/ml iny.prell.x5x3ml",
          potency: "100 UI/ml",
          drug: "insulina glargina",
          laboratory: "Raffo",
          coverage: 100,
          units: 1500,
          troquel: "6419552",
          category: "Insulina de Acción Prolongada",
          description:
            "Insulina glargina de acción prolongada para control basal de glucosa durante 24 horas. Proporciona liberación constante de insulina.",
        },
        {
          id: 3,
          name: "INSULINA DENSULIN N ",
          presentation: "Hum.recomb.100UI/mlx10ml",
          potency: "100 UI/ml",
          drug: "insulina humana",
          laboratory: "Denver Farma",
          coverage: 100,
          units: 1000,
          troquel: "5475261",
          category: "Insulina Humana Intermedia",
          description:
            "Insulina humana recombinante para regular niveles de azúcar en sangre. Permite a las células absorber glucosa para energía.",
        },
        {
          id: 4,
          name: "INSULINA DENSULIN N ",
          presentation: "100 UI cart.x 5 x 3 ml ",
          potency: "100 UI/ml",
          drug: "insulina humana",
          laboratory: "Denver Farma",
          coverage: 100,
          units: 1500,
          troquel: "5475262",
          category: "Insulina Humana Intermedia",
          description:
            "Insulina humana recombinante para regular niveles de azúcar en sangre. Permite a las células absorber glucosa para energía.",
        },
        {
          id: 5,
          name: "INSULINA DENSULIN R ",
          presentation: "Hum.recomb.100UI/mlx10ml",
          potency: "100 UI/ml",
          drug: "insulina humana ",
          laboratory: "Denver Farma",
          coverage: 100,
          units: 1000,
          troquel: "5475131",
          category: "Insulina Humana Regular",
          description:
            "Insulina humana regular de acción corta para control glucémico. Ideal para pacientes con diabetes que requieren insulina exógena.",
        },
        {
          id: 6,
          name: "INSULINA DENSULIN R ",
          presentation: "100 UI cart.x 5 x 3 ml ",
          potency: "100 UI/ml",
          drug: "insulina humana ",
          laboratory: "Denver Farma",
          coverage: 100,
          units: 1500,
          troquel: "5475132",
          category: "Insulina Humana Regular",
          description:
            "Insulina humana regular de acción corta para control glucémico. Ideal para pacientes con diabetes que requieren insulina exógena.",
        },
        {
          id: 7,
          name: "INSULINA FIASP FLEXTOUCH ",
          presentation: "100 UI lapic.x 5 x 3 ml ",
          potency: "100 UI/ml",
          drug: "insulina aspártica ",
          laboratory: "Novo Nordisk",
          coverage: 100,
          units: 1500,
          troquel: "6587421",
          category: "Insulina de Acción Ultrarrápida",
          description:
            "Insulina aspártica ultrarrápida para control postprandial inmediato. Actúa en 10-20 minutos con pico de acción en 1-3 horas.",
        },
        {
          id: 8,
          name: "INSULINA FIASP PENFILL ",
          presentation: "100 UI cart.x 5 x 3 ml ",
          potency: "100 UI/ml",
          drug: "insulina aspártica ",
          laboratory: "Novo Nordisk",
          coverage: 100,
          units: 1500,
          troquel: "6587422",
          category: "Insulina de Acción Ultrarrápida",
          description:
            "Insulina aspártica ultrarrápida para control postprandial inmediato. Actúa en 10-20 minutos con pico de acción en 1-3 horas.",
        },
      ];
      */
