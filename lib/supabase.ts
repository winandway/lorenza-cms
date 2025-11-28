import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos
export interface SiteContent {
  id: string
  key: string
  value_es: string
  value_pt: string
  created_at: string
  updated_at: string
}

export interface TeamImage {
  id: string
  image_url: string
  alt_text_es: string
  alt_text_pt: string
  order_index: number
  active: boolean
  created_at: string
}

export interface ContactInfo {
  id: string
  whatsapp_number: string
  usdt_wallet: string
  usdt_network: string
  sells_usdt: boolean
  hero_image_url: string
  created_at: string
  updated_at: string
}

export interface CareerHighlight {
  id: string
  title_es: string
  title_pt: string
  description_es: string
  description_pt: string
  icon: string
  order_index: number
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  role_es: string
  role_pt: string
  text_es: string
  text_pt: string
  image_url?: string
  rating: number
  order_index: number
  active: boolean
  created_at: string
  updated_at: string
}
