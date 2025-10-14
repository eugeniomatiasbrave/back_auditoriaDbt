import express from "express";
import { initMySql } from "./config/connectdb.js";
import config from "./config/config.env.js";
import dotenv from "dotenv";
import cors from "cors";
import medicationRoutes from "./routes/medicationRoutes.js";

dotenv.config();

const app = express();
const PORT = config.app.port || 3000;

// Configurar CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Middlewares de parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rutas de Medicamentos
app.use("/api/medications", medicationRoutes);

// Inicializar base de datos y luego el servidor
const startServer = async () => {
  try {
    await initMySql();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error);
    process.exit(1);
  }
};

startServer();
