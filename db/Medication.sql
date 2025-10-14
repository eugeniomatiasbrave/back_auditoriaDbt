-- Schema para medicamentos (Insulinas)

-- Crea la base de datos si no existe
CREATE DATABASE IF NOT EXISTS auditoria_dbt; 

-- Usa la base de datos creada
USE auditoria_dbt;

-- Crear la tabla de medicamentos
CREATE TABLE IF NOT EXISTS medications (
    -- Clave primaria que se incrementa automáticamente
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Información básica del medicamento
    name VARCHAR(200) NOT NULL COMMENT 'Nombre comercial del medicamento',
    presentation VARCHAR(100) NOT NULL COMMENT 'Presentación del medicamento (ej: 100UI/ml lap.prellx5x3ml)',
    potency VARCHAR(50) NOT NULL COMMENT 'Potencia del medicamento (ej: 100 UI/ml)',
    drug VARCHAR(100) NOT NULL COMMENT 'Principio activo (ej: insulina glulisina)',
    laboratory VARCHAR(100) NOT NULL COMMENT 'Laboratorio fabricante',
    
    -- Información de cobertura y stock
    coverage INT NOT NULL DEFAULT 0 COMMENT 'Porcentaje de cobertura',
    units INT NOT NULL DEFAULT 0 COMMENT 'Unidades disponibles en stock',
    
    -- Código único del medicamento
    troquel VARCHAR(20) NOT NULL UNIQUE COMMENT 'Código troquel único del medicamento',
    
    -- Relación con categorías (clave foránea)
    categoryId INT NOT NULL,
    
    -- Descripción opcional
    description TEXT COMMENT 'Descripción detallada del medicamento',
    
    -- Timestamps automáticos
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación',
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización',
    
    -- Definir la clave foránea
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    
    -- Índices para mejorar rendimiento
    INDEX idx_medication_name (name),
    INDEX idx_medication_laboratory (laboratory),
    INDEX idx_medication_drug (drug),
    INDEX idx_medication_troquel (troquel),
    INDEX idx_medication_category (categoryId)
);


-- Insertar los medicamentos de ejemplo
INSERT INTO medications (name, presentation, potency, drug, laboratory, coverage, units, troquel, categoryId, description) VALUES 
(
    'INSULINA APIDRA SOLOSTAR',
    '100UI/ml lap.prellx5x3ml',
    '100 UI/ml',
    'insulina glulisina',
    'Sanofi-Aventis',
    100,
    1500,
    '5524683',
    (SELECT id FROM categories WHERE name = 'Insulina de Acción Rápida'),
    'Insulina glulisina de acción rápida para control glucémico después de las comidas. Actúa en 10-20 minutos con duración de 3-5 horas.'
),
(
    'INSULINA BASAGLAR KWIKPEN',
    '100U/ml iny.prell.x5x3ml',
    '100 UI/ml',
    'insulina glargina',
    'Raffo',
    100,
    1500,
    '6419552',
    (SELECT id FROM categories WHERE name = 'Insulina de Acción Prolongada'),
    'Insulina glargina de acción prolongada para control basal de glucosa durante 24 horas. Proporciona liberación constante de insulina.'
),
(
    'INSULINA DENSULIN N',
    'Hum.recomb.100UI/mlx10ml',
    '100 UI/ml',
    'insulina humana',
    'Denver Farma',
    100,
    1000,
    '5475261',
    (SELECT id FROM categories WHERE name = 'Insulina Humana Intermedia'),
    'Insulina humana recombinante para regular niveles de azúcar en sangre. Permite a las células absorber glucosa para energía.'
),
(
    'INSULINA DENSULIN N',
    '100 UI cart.x 5 x 3 ml',
    '100 UI/ml',
    'insulina humana',
    'Denver Farma',
    100,
    1500,
    '5475262',
    (SELECT id FROM categories WHERE name = 'Insulina Humana Intermedia'),
    'Insulina humana recombinante para regular niveles de azúcar en sangre. Permite a las células absorber glucosa para energía.'
),
(
    'INSULINA DENSULIN R',
    'Hum.recomb.100UI/mlx10ml',
    '100 UI/ml',
    'insulina humana',
    'Denver Farma',
    100,
    1000,
    '5475131',
    (SELECT id FROM categories WHERE name = 'Insulina Humana Regular'),
    'Insulina humana regular de acción corta para control glucémico. Ideal para pacientes con diabetes que requieren insulina exógena.'
),
(
    'INSULINA DENSULIN R',
    '100 UI cart.x 5 x 3 ml',
    '100 UI/ml',
    'insulina humana',
    'Denver Farma',
    100,
    1500,
    '5475132',
    (SELECT id FROM categories WHERE name = 'Insulina Humana Regular'),
    'Insulina humana regular de acción corta para control glucémico. Ideal para pacientes con diabetes que requieren insulina exógena.'
),
(
    'INSULINA FIASP FLEXTOUCH',
    '100 UI lapic.x 5 x 3 ml',
    '100 UI/ml',
    'insulina aspártica',
    'Novo Nordisk',
    100,
    1500,
    '6587421',
    (SELECT id FROM categories WHERE name = 'Insulina de Acción Ultrarrápida'),
    'Insulina aspártica ultrarrápida para control postprandial inmediato. Actúa en 10-20 minutos con pico de acción en 1-3 horas.'
),
(
    'INSULINA FIASP PENFILL',
    '100 UI cart.x 5 x 3 ml',
    '100 UI/ml',
    'insulina aspártica',
    'Novo Nordisk',
    100,
    1500,
    '6587422',
    (SELECT id FROM categories WHERE name = 'Insulina de Acción Ultrarrápida'),
    'Insulina aspártica ultrarrápida para control postprandial inmediato. Actúa en 10-20 minutos con pico de acción en 1-3 horas.'
)
ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    presentation = VALUES(presentation),
    potency = VALUES(potency),
    drug = VALUES(drug),
    laboratory = VALUES(laboratory),
    coverage = VALUES(coverage),
    units = VALUES(units),
    description = VALUES(description);

-- Consulta para verificar los datos insertados
-- SELECT m.*, c.name as category_name FROM medications m 
-- JOIN categories c ON m.categoryId = c.id;