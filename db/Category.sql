-- Schema para categorías de medicamentos

-- Crea la base de datos si no existe
CREATE DATABASE IF NOT EXISTS auditoria_dbt; 

-- Usa la base de datos creada
USE auditoria_dbt;

-- Crear la tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
    -- Clave primaria que se incrementa automáticamente
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Nombre de la categoría (único)
    name VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nombre de la categoría de medicamento',
    
    -- Descripción opcional de la categoría
    description TEXT COMMENT 'Descripción detallada de la categoría',
    
    -- Timestamps automáticos
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización',
    
    -- Índices para mejorar rendimiento
    INDEX idx_category_name (name)
);

-- Insertar las categorías de insulinas
INSERT INTO categories (name, description) VALUES 
(
    'Insulina de Acción Rápida',
    'Insulinas que actúan rápidamente después de la administración, ideales para control postprandial. Tiempo de inicio: 10-20 minutos.'
),
(
    'Insulina de Acción Prolongada',
    'Insulinas de liberación lenta para control basal de glucosa durante 24 horas. Proporcionan cobertura de insulina continua.'
),
(
    'Insulina Humana Intermedia',
    'Insulinas humanas de acción intermedia con duración de 12-18 horas. Utilizadas para control basal y postprandial.'
),
(
    'Insulina Humana Regular',
    'Insulinas humanas de acción regular/corta para control glucémico. Tiempo de inicio: 30 minutos, duración: 6-8 horas.'
),
(
    'Insulina de Acción Ultrarrápida',
    'Insulinas de acción ultrarrápida para control postprandial inmediato. Actúan en menos de 15 minutos con pico en 1-3 horas.'
)
ON DUPLICATE KEY UPDATE 
    description = VALUES(description),
    updatedAt = CURRENT_TIMESTAMP;

-- Consulta para verificar los datos insertados
-- SELECT * FROM categories ORDER BY id;