-- Schema para medicamentos (Insulinas)
CREATE TABLE medications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand_name VARCHAR(255),
    generic_name VARCHAR(255) NOT NULL,
    
    -- Clasificación de insulina
    insulin_type VARCHAR(50) NOT NULL CHECK (insulin_type IN (
        'rapid_acting',     -- Acción rápida (Lispro, Aspart, Glulisina)
        'short_acting',     -- Acción corta (Regular)
        'intermediate',     -- Acción intermedia (NPH)
        'long_acting',      -- Acción prolongada (Glargina, Detemir)
        'ultra_long',       -- Ultra larga (Degludec)
        'premixed'          -- Premezclas
    )),
    
    -- Concentración y presentación
    concentration VARCHAR(50) DEFAULT 'U-100', -- U-100, U-200, U-300, U-500
    presentation VARCHAR(100), -- Vial, pluma, cartucho
    volume_ml DECIMAL(5,2), -- Volumen en ml
    
    -- Metadatos básicos
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar consultas
CREATE INDEX idx_medications_insulin_type ON medications(insulin_type);
CREATE INDEX idx_medications_brand_name ON medications(brand_name);
CREATE INDEX idx_medications_generic_name ON medications(generic_name);
CREATE INDEX idx_medications_is_active ON medications(is_active);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_medications_updated_at 
    BEFORE UPDATE ON medications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios en la tabla
COMMENT ON TABLE medications IS 'Tabla para almacenar información de medicamentos de insulina';
COMMENT ON COLUMN medications.insulin_type IS 'Tipo de insulina según su perfil de acción';
COMMENT ON COLUMN medications.concentration IS 'Concentración de la insulina (U-100, U-200, etc.)';

