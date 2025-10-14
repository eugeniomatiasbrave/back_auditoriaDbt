-- Schema para usuarios del sistema

-- Crea la base de datos si no existe
CREATE DATABASE IF NOT EXISTS auditoria_dbt; 

-- Usa la base de datos creada
USE auditoria_dbt;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    -- Clave primaria que se incrementa automáticamente
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Información básica del usuario (nombres separados)
    firstName VARCHAR(255) COMMENT 'Nombre del usuario',
    lastName VARCHAR(255) COMMENT 'Apellido del usuario',
    
    -- Credenciales de acceso
    email VARCHAR(255) UNIQUE COMMENT 'Correo electrónico único del usuario',
    password VARCHAR(255) COMMENT 'Contraseña encriptada del usuario',
    
    -- Rol del usuario en el sistema
    role VARCHAR(50) NOT NULL DEFAULT 'user' COMMENT 'Rol del usuario (admin, user, auditor, etc.)',
    
    -- Timestamps automáticos
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación del usuario',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización',
    
    -- Índices para mejorar rendimiento
    INDEX idx_user_email (email),
    INDEX idx_user_role (role),
    INDEX idx_user_firstName (firstName),
    INDEX idx_user_lastName (lastName)
);

-- Insertar usuarios de ejemplo
INSERT INTO users (firstName, lastName, email, password, role) VALUES 
(
    'Juan',
    'Pérez',
    'admin@auditoria.com',
    '$2b$10$ejemplo_hash_encriptado_admin',
    'admin'
),
(
    'María',
    'González',
    'auditor@auditoria.com',
    '$2b$10$ejemplo_hash_encriptado_auditor',
    'auditor'
),
(
    'Carlos',
    'López',
    'usuario@auditoria.com',
    '$2b$10$ejemplo_hash_encriptado_user',
    'user'
),
(
    'Ana',
    'Martínez',
    'farmaceutico@auditoria.com',
    '$2b$10$ejemplo_hash_encriptado_farmaceutico',
    'pharmacist'
),
(
    NULL,
    NULL,
    'test@example.com',
    '$2b$10$ejemplo_hash_encriptado_test',
    'user'
)
ON DUPLICATE KEY UPDATE 
    firstName = VALUES(firstName),
    lastName = VALUES(lastName),
    role = VALUES(role),
    updatedAt = CURRENT_TIMESTAMP;

-- Consulta para verificar los datos insertados (sin mostrar contraseñas)
-- SELECT id, firstName, lastName, email, role, createdAt, updatedAt FROM users ORDER BY id;