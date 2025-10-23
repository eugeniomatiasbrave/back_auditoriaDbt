import { config } from "dotenv";
config();

export default {
  app: {
    port: process.env.PORT || 3000,
    mode: process.env.NODE_ENV || "development",
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "auditoria_dbt",
    logging: process.env.DB_LOGGING === "true" || false,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "mi_secreto_super_seguro"
  },
};
