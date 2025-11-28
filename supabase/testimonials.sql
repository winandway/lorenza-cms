-- Tabla de testimonios para Lorenza CMS
-- Ejecutar este SQL en el SQL Editor de Supabase

-- Crear la tabla testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role_es TEXT NOT NULL,
  role_pt TEXT NOT NULL,
  text_es TEXT NOT NULL,
  text_pt TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear indice para ordenar
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(order_index);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(active);

-- Habilitar RLS (Row Level Security)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Politica para lectura publica (todos pueden ver testimonios activos)
CREATE POLICY "Testimonios publicos" ON testimonials
  FOR SELECT USING (active = true);

-- Politica para modificacion (solo usuarios autenticados)
CREATE POLICY "Usuarios autenticados pueden modificar testimonios" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- Trigger para actualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_testimonials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_testimonials_updated_at();

-- Insertar testimonios iniciales
INSERT INTO testimonials (name, role_es, role_pt, text_es, text_pt, rating, order_index, active) VALUES
(
  'Maria Garcia',
  'Miembro del equipo',
  'Membro da equipe',
  'Gracias a Lorenza logre alcanzar mis metas financieras en tiempo record. Su liderazgo y mentoria son invaluables.',
  'Gracas a Lorenza consegui alcancar minhas metas financeiras em tempo recorde. Sua lideranca e mentoria sao inestimáveis.',
  5,
  0,
  true
),
(
  'Carlos Rodriguez',
  'Lider de equipo',
  'Lider de equipe',
  'El sistema de trabajo de Lorenza es efectivo y comprobado. En 6 meses duplique mis ingresos.',
  'O sistema de trabalho da Lorenza e eficaz e comprovado. Em 6 meses dobrei minha renda.',
  5,
  1,
  true
),
(
  'Ana Martinez',
  'Emprendedora',
  'Empreendedora',
  'Nunca pense que podria tener mi propio negocio. Lorenza me mostro el camino y me acompano en cada paso.',
  'Nunca pensei que poderia ter meu proprio negocio. Lorenza me mostrou o caminho e me acompanhou em cada passo.',
  5,
  2,
  true
);
