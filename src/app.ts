import express from "express";
import { initMySql } from "./config/connectdb.js";
import config from "./config/config.env.js";
import dotenv from "dotenv";
import cors from "cors";
import medicationsRoutes from "./routes/medicationsRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import sessionsRoutes from "./routes/sessionsRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = config.app.port || 3000;

// Configurar CORS 
// "http://localhost:5173"
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://brave-auditoria-dbt.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Middlewares de parsing
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Rutas de Medicamentos
app.use("/api/medications", medicationsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/sessions", sessionsRoutes);

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
