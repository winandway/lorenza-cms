-- =====================================================
-- LORENZA CMS - Database Setup Script
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: site_content
-- Stores all translatable content for the website
-- =====================================================
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value_es TEXT NOT NULL DEFAULT '',
  value_pt TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default content
INSERT INTO site_content (key, value_es, value_pt) VALUES
  ('hero_name', 'Lorenza', 'Lorenza'),
  ('hero_subtitle', 'Transformando negocios con visión y estrategia', 'Transformando negócios com visão e estratégia'),
  ('about_title', 'Mi Trayectoria', 'Minha Trajetória'),
  ('about_subtitle', 'Años de experiencia construyendo éxito', 'Anos de experiência construindo sucesso'),
  ('about_description', 'Con más de una década de experiencia en el mundo de los negocios, he ayudado a cientos de personas a alcanzar sus metas financieras y profesionales.', 'Com mais de uma década de experiência no mundo dos negócios, ajudei centenas de pessoas a alcançar suas metas financeiras e profissionais.')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- TABLE: career_highlights
-- Career/trajectory highlights shown in About section
-- =====================================================
CREATE TABLE IF NOT EXISTS career_highlights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title_es VARCHAR(200) NOT NULL,
  title_pt VARCHAR(200) NOT NULL,
  description_es TEXT NOT NULL,
  description_pt TEXT NOT NULL,
  icon VARCHAR(50) DEFAULT 'star',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default highlights
INSERT INTO career_highlights (title_es, title_pt, description_es, description_pt, icon, order_index) VALUES
  ('Experiencia Comprobada', 'Experiência Comprovada', 'Más de 10 años transformando negocios y creando oportunidades de crecimiento.', 'Mais de 10 anos transformando negócios e criando oportunidades de crescimento.', 'award', 1),
  ('Equipo de Éxito', 'Equipe de Sucesso', 'Liderando equipos comprometidos hacia metas extraordinarias.', 'Liderando equipes comprometidas rumo a metas extraordinárias.', 'users', 2),
  ('Resultados Reales', 'Resultados Reais', 'Estrategias probadas que generan crecimiento sostenible.', 'Estratégias comprovadas que geram crescimento sustentável.', 'trending', 3)
ON CONFLICT DO NOTHING;

-- =====================================================
-- TABLE: team_images
-- Images for the team carousel
-- =====================================================
CREATE TABLE IF NOT EXISTS team_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text_es VARCHAR(200) DEFAULT '',
  alt_text_pt VARCHAR(200) DEFAULT '',
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: contact_info
-- Contact information and settings
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  whatsapp_number VARCHAR(20) DEFAULT '',
  usdt_wallet VARCHAR(100) DEFAULT '',
  usdt_network VARCHAR(20) DEFAULT 'TRC20',
  sells_usdt BOOLEAN DEFAULT true,
  hero_image_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default contact info
INSERT INTO contact_info (whatsapp_number, usdt_wallet, usdt_network, sells_usdt) 
VALUES ('', '', 'TRC20', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- STORAGE: Create buckets for images
-- =====================================================
-- Note: Run these in Supabase Storage settings or API

-- Create images bucket for hero image
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT DO NOTHING;

-- Create team bucket for carousel images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team', 'team', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- RLS (Row Level Security) Policies
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (for the website)
CREATE POLICY "Public can read site_content" ON site_content
  FOR SELECT USING (true);

CREATE POLICY "Public can read career_highlights" ON career_highlights
  FOR SELECT USING (true);

CREATE POLICY "Public can read team_images" ON team_images
  FOR SELECT USING (true);

CREATE POLICY "Public can read contact_info" ON contact_info
  FOR SELECT USING (true);

-- Authenticated users can do everything (admin)
CREATE POLICY "Authenticated can manage site_content" ON site_content
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can manage career_highlights" ON career_highlights
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can manage team_images" ON team_images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can manage contact_info" ON contact_info
  FOR ALL USING (auth.role() = 'authenticated');

-- Storage policies
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT USING (bucket_id IN ('images', 'team'));

CREATE POLICY "Authenticated can upload images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id IN ('images', 'team') 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated can update images" ON storage.objects
  FOR UPDATE USING (
    bucket_id IN ('images', 'team') 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated can delete images" ON storage.objects
  FOR DELETE USING (
    bucket_id IN ('images', 'team') 
    AND auth.role() = 'authenticated'
  );

-- =====================================================
-- Create updated_at trigger
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON contact_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- IMPORTANT: Create admin user
-- Go to Supabase Authentication > Users > Add user
-- Email: lorenza@tudominio.com (o el email que prefieras)
-- Password: (una contraseña segura)
-- =====================================================
