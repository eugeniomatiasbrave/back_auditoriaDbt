import { Sequelize } from "sequelize";
import config from "./config.env.js";
import mysql from "mysql2/promise";

const { dialect, host, port, username, password, database } = config.db;

const createDatabase = async () => {
  try {
    console.log(`🔌 Intentando conectar a MySQL en ${host}:${port}`);
    console.log(
      `DEBUG: host=${host}, port=${port}, user=${username}, pass=${password}`
    );
    const connection = await mysql.createConnection({
      host: host,
      user: username,
      password: password,
      port: Number(port),
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();
    console.log(`✅ Base de datos '${database}' creada/verificada`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Error al crear base de datos:`, error.message);
    } else {
      console.error(`❌ Error al crear base de datos:`, error);
    }
    throw error;
  }
};

const db = new Sequelize(database, username, password, {
  host: host,
  dialect: (dialect as any) || "mysql",
  port: Number(port),
  logging: false, // Desactivar logs de SQL en desarrollo
});

export const initMySql = async () => {
  try {
    await createDatabase();
    await db.authenticate();
    await db.sync({ force: false });
    console.log("✅ Conectado a la base de datos MySQL");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error de conexión a MySQL:", error.message);
    } else {
      console.error("❌ Error de conexión a MySQL:", error);
    }
    process.exit(1); // Terminar la aplicación si no puede conectar
  }
};

export default db;
