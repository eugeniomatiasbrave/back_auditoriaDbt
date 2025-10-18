import { config } from "dotenv";
config();

export default {
  app: {
    port: process.env.PORT || 3000,
    mode: process.env.NODE_ENV || "development",
  },
  db: {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "auditoria_dbt",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "mi_secreto_super_seguro"
  },
};
