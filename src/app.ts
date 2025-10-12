import express from "express";
import medicationRoutes from "./routes/medicationRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
