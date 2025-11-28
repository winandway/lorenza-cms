'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { useLanguage } from '@/lib/i18n'
import { supabase } from '@/lib/supabase'
import {
  LogOut,
  Save,
  Loader2,
  Check,
  Upload,
  Trash2,
  Plus,
  Image as ImageIcon,
  FileText,
  Settings,
  Users,
  Home,
  MessageSquareQuote,
  Star,
  Edit3
} from 'lucide-react'
import Image from 'next/image'

type Tab = 'content' | 'team' | 'testimonials' | 'settings'

interface ContentItem {
  id: string
  key: string
  value_es: string
  value_pt: string
}

interface TeamImageItem {
  id: string
  image_url: string
  alt_text_es: string
  alt_text_pt: string
  order_index: number
  active: boolean
}

interface SettingsData {
  whatsapp_number: string
  usdt_wallet: string
  usdt_network: string
  sells_usdt: boolean
  hero_image_url: string
}

interface TestimonialItem {
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
}

export default function AdminPage() {
  const { user, loading: authLoading, signIn, signOut, checkUser } = useAuth()
  const { t } = useLanguage()
  
  // Auth state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  
  // Admin state
  const [activeTab, setActiveTab] = useState<Tab>('content')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  // Content state
  const [content, setContent] = useState<ContentItem[]>([])
  const [teamImages, setTeamImages] = useState<TeamImageItem[]>([])
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null)
  const [settings, setSettings] = useState<SettingsData>({
    whatsapp_number: '',
    usdt_wallet: '',
    usdt_network: 'TRC20',
    sells_usdt: true,
    hero_image_url: ''
  })

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      loadAllContent()
    }
  }, [user])

  async function loadAllContent() {
    // Load site content
    const { data: contentData } = await supabase
      .from('site_content')
      .select('*')
      .order('key')
    
    if (contentData) setContent(contentData)

    // Load team images
    const { data: imagesData } = await supabase
      .from('team_images')
      .select('*')
      .order('order_index')

    if (imagesData) setTeamImages(imagesData)

    // Load testimonials (puede no existir la tabla aún)
    try {
      const { data: testimonialsData } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index')

      if (testimonialsData) setTestimonials(testimonialsData)
    } catch {
      console.log('Tabla testimonials no existe aún')
    }

    // Load settings
    const { data: settingsData } = await supabase
      .from('contact_info')
      .select('*')
      .single()
    
    if (settingsData) setSettings(settingsData)
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setIsSigningIn(true)
    setAuthError('')
    
    const { error } = await signIn(email, password)
    
    if (error) {
      setAuthError(error)
    }
    
    setIsSigningIn(false)
  }

  async function saveContent() {
    setSaving(true)
    
    try {
      // Upsert all content items
      for (const item of content) {
        await supabase
          .from('site_content')
          .upsert({
            key: item.key,
            value_es: item.value_es,
            value_pt: item.value_pt,
            updated_at: new Date().toISOString()
          }, { onConflict: 'key' })
      }
      
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Error saving content:', error)
    }
    
    setSaving(false)
  }

  async function saveSettings() {
    setSaving(true)
    
    try {
      const { data: existing } = await supabase
        .from('contact_info')
        .select('id')
        .single()

      if (existing) {
        await supabase
          .from('contact_info')
          .update({
            ...settings,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)
      } else {
        await supabase
          .from('contact_info')
          .insert(settings)
      }
      
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Error saving settings:', error)
    }
    
    setSaving(false)
  }

  async function uploadImage(file: File, bucket: string = 'images'): Promise<string | null> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)
    
    if (error) {
      console.error('Upload error:', error)
      return null
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)
    
    return publicUrl
  }

  async function handleHeroImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    
    const url = await uploadImage(file)
    if (url) {
      setSettings(prev => ({ ...prev, hero_image_url: url }))
    }
  }

  async function addTeamImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    
    const url = await uploadImage(file, 'team')
    if (url) {
      const newImage: TeamImageItem = {
        id: crypto.randomUUID(),
        image_url: url,
        alt_text_es: '',
        alt_text_pt: '',
        order_index: teamImages.length,
        active: true
      }
      
      await supabase.from('team_images').insert(newImage)
      setTeamImages(prev => [...prev, newImage])
    }
  }

  async function deleteTeamImage(id: string) {
    await supabase.from('team_images').delete().eq('id', id)
    setTeamImages(prev => prev.filter(img => img.id !== id))
  }

  async function toggleTeamImageActive(id: string, active: boolean) {
    await supabase.from('team_images').update({ active }).eq('id', id)
    setTeamImages(prev => prev.map(img => 
      img.id === id ? { ...img, active } : img
    ))
  }

  function updateContentItem(key: string, field: 'value_es' | 'value_pt', value: string) {
    setContent(prev => prev.map(item =>
      item.key === key ? { ...item, [field]: value } : item
    ))
  }

  function addContentItem() {
    const newItem: ContentItem = {
      id: crypto.randomUUID(),
      key: `new_item_${Date.now()}`,
      value_es: '',
      value_pt: ''
    }
    setContent(prev => [...prev, newItem])
  }

  // Testimonial functions
  function createNewTestimonial(): TestimonialItem {
    return {
      id: crypto.randomUUID(),
      name: '',
      role_es: '',
      role_pt: '',
      text_es: '',
      text_pt: '',
      rating: 5,
      order_index: testimonials.length,
      active: true
    }
  }

  async function saveTestimonial(testimonial: TestimonialItem) {
    setSaving(true)
    try {
      const { data: existing } = await supabase
        .from('testimonials')
        .select('id')
        .eq('id', testimonial.id)
        .single()

      if (existing) {
        await supabase
          .from('testimonials')
          .update({
            name: testimonial.name,
            role_es: testimonial.role_es,
            role_pt: testimonial.role_pt,
            text_es: testimonial.text_es,
            text_pt: testimonial.text_pt,
            rating: testimonial.rating,
            order_index: testimonial.order_index,
            active: testimonial.active,
            updated_at: new Date().toISOString()
          })
          .eq('id', testimonial.id)
      } else {
        await supabase.from('testimonials').insert(testimonial)
      }

      setTestimonials(prev => {
        const idx = prev.findIndex(t => t.id === testimonial.id)
        if (idx >= 0) {
          const updated = [...prev]
          updated[idx] = testimonial
          return updated
        }
        return [...prev, testimonial]
      })

      setEditingTestimonial(null)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Error saving testimonial:', error)
    }
    setSaving(false)
  }

  async function deleteTestimonial(id: string) {
    await supabase.from('testimonials').delete().eq('id', id)
    setTestimonials(prev => prev.filter(t => t.id !== id))
  }

  async function toggleTestimonialActive(id: string, active: boolean) {
    await supabase.from('testimonials').update({ active }).eq('id', id)
    setTestimonials(prev => prev.map(t =>
      t.id === id ? { ...t, active } : t
    ))
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    )
  }

  // Login form
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-dark flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold gradient-text mb-2">
                {t('admin.title')}
              </h1>
              <p className="text-cream/60">Lorenza CMS</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              {authError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                  {authError}
                </div>
              )}
              
              <div>
                <label className="block text-cream/70 text-sm mb-2">
                  {t('admin.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-cream/70 text-sm mb-2">
                  {t('admin.password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSigningIn}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {isSigningIn ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  t('admin.login')
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-primary-500/60 hover:text-primary-500 text-sm flex items-center justify-center gap-2">
                <Home size={16} />
                <span>Volver al sitio</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-slate-dark">
      {/* Header */}
      <header className="bg-charcoal border-b border-primary-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-xl font-bold gradient-text">
              Admin Panel
            </h1>
            <a 
              href="/" 
              target="_blank"
              className="text-cream/50 hover:text-primary-500 text-sm flex items-center gap-1"
            >
              <Home size={14} />
              Ver sitio
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-cream/50 text-sm hidden sm:block">{user.email}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-2 text-cream/70 hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">{t('admin.logout')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-primary-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            {[
              { id: 'content' as Tab, label: t('admin.content'), icon: FileText },
              { id: 'team' as Tab, label: t('admin.team'), icon: Users },
              { id: 'testimonials' as Tab, label: 'Testimonios', icon: MessageSquareQuote },
              { id: 'settings' as Tab, label: t('admin.settings'), icon: Settings },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-cream/50 hover:text-cream'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-cream">
                {t('admin.content')}
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={addContentItem}
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-2"
                >
                  <Plus size={16} />
                  {t('admin.add')}
                </button>
                <button
                  onClick={saveContent}
                  disabled={saving}
                  className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                >
                  {saving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : saved ? (
                    <Check size={16} />
                  ) : (
                    <Save size={16} />
                  )}
                  {saving ? t('admin.saving') : saved ? t('admin.saved') : t('admin.save')}
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {content.map(item => (
                <div key={item.id} className="glass-card p-6">
                  <div className="mb-4">
                    <label className="block text-primary-500 text-sm font-medium mb-2">
                      Key: {item.key}
                    </label>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-cream/70 text-sm mb-2 flex items-center gap-2">
                        🇪🇸 Español
                      </label>
                      <textarea
                        value={item.value_es}
                        onChange={(e) => updateContentItem(item.key, 'value_es', e.target.value)}
                        className="input-field min-h-[100px] resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-cream/70 text-sm mb-2 flex items-center gap-2">
                        🇧🇷 Português
                      </label>
                      <textarea
                        value={item.value_pt}
                        onChange={(e) => updateContentItem(item.key, 'value_pt', e.target.value)}
                        className="input-field min-h-[100px] resize-y"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-cream">
                {t('admin.team')} - Carrusel
              </h2>
              <label className="btn-primary text-sm py-2 px-4 flex items-center gap-2 cursor-pointer">
                <Upload size={16} />
                {t('admin.upload')}
                <input
                  type="file"
                  accept="image/*"
                  onChange={addTeamImage}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {teamImages.map(image => (
                <div 
                  key={image.id} 
                  className={`glass-card overflow-hidden ${!image.active ? 'opacity-50' : ''}`}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={image.image_url}
                      alt={image.alt_text_es || 'Team image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={image.active}
                        onChange={(e) => toggleTeamImageActive(image.id, e.target.checked)}
                        className="w-4 h-4 accent-primary-500"
                      />
                      <span className="text-cream/70 text-sm">Activo</span>
                    </label>
                    <button
                      onClick={() => deleteTeamImage(image.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {teamImages.length === 0 && (
              <div className="glass-card p-12 text-center">
                <ImageIcon size={48} className="text-cream/30 mx-auto mb-4" />
                <p className="text-cream/50">No hay imágenes en el carrusel</p>
                <p className="text-cream/30 text-sm mt-2">Sube imágenes para mostrar en el carrusel de equipo</p>
              </div>
            )}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-cream">
                Testimonios
              </h2>
              <button
                onClick={() => setEditingTestimonial(createNewTestimonial())}
                className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
              >
                <Plus size={16} />
                Nuevo Testimonio
              </button>
            </div>

            {/* Edit Modal */}
            {editingTestimonial && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <div className="glass-card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold text-cream mb-6">
                    {testimonials.find(t => t.id === editingTestimonial.id) ? 'Editar' : 'Nuevo'} Testimonio
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-cream/70 text-sm mb-2">Nombre</label>
                      <input
                        type="text"
                        value={editingTestimonial.name}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                        className="input-field"
                        placeholder="Nombre del cliente"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-cream/70 text-sm mb-2">Rol (Español)</label>
                        <input
                          type="text"
                          value={editingTestimonial.role_es}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role_es: e.target.value })}
                          className="input-field"
                          placeholder="Ej: Miembro del equipo"
                        />
                      </div>
                      <div>
                        <label className="block text-cream/70 text-sm mb-2">Rol (Portugués)</label>
                        <input
                          type="text"
                          value={editingTestimonial.role_pt}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role_pt: e.target.value })}
                          className="input-field"
                          placeholder="Ex: Membro da equipe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-cream/70 text-sm mb-2">Testimonio (Español)</label>
                      <textarea
                        value={editingTestimonial.text_es}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text_es: e.target.value })}
                        className="input-field min-h-[100px] resize-y"
                        placeholder="Escribe el testimonio en español..."
                      />
                    </div>

                    <div>
                      <label className="block text-cream/70 text-sm mb-2">Testimonio (Portugués)</label>
                      <textarea
                        value={editingTestimonial.text_pt}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text_pt: e.target.value })}
                        className="input-field min-h-[100px] resize-y"
                        placeholder="Escreva o depoimento em português..."
                      />
                    </div>

                    <div>
                      <label className="block text-cream/70 text-sm mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setEditingTestimonial({ ...editingTestimonial, rating: star })}
                            className="p-1"
                          >
                            <Star
                              size={24}
                              className={star <= editingTestimonial.rating
                                ? 'text-primary-500 fill-primary-500'
                                : 'text-cream/30'
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="testimonial_active"
                        checked={editingTestimonial.active}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, active: e.target.checked })}
                        className="w-5 h-5 accent-primary-500"
                      />
                      <label htmlFor="testimonial_active" className="text-cream cursor-pointer">
                        Activo (visible en el sitio)
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setEditingTestimonial(null)}
                      className="btn-outline flex-1"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => saveTestimonial(editingTestimonial)}
                      disabled={saving || !editingTestimonial.name || !editingTestimonial.text_es}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Testimonials List */}
            <div className="grid gap-4">
              {testimonials.map(testimonial => (
                <div
                  key={testimonial.id}
                  className={`glass-card p-6 ${!testimonial.active ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-cream">{testimonial.name || 'Sin nombre'}</h3>
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-primary-500 fill-primary-500" />
                          ))}
                        </div>
                        {!testimonial.active && (
                          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                            Inactivo
                          </span>
                        )}
                      </div>
                      <p className="text-cream/50 text-sm mb-2">{testimonial.role_es}</p>
                      <p className="text-cream/70 text-sm line-clamp-2">{testimonial.text_es}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingTestimonial(testimonial)}
                        className="p-2 text-cream/50 hover:text-primary-500 transition-colors"
                        title="Editar"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => toggleTestimonialActive(testimonial.id, !testimonial.active)}
                        className={`p-2 transition-colors ${
                          testimonial.active
                            ? 'text-green-400 hover:text-green-300'
                            : 'text-cream/30 hover:text-green-400'
                        }`}
                        title={testimonial.active ? 'Desactivar' : 'Activar'}
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="p-2 text-cream/50 hover:text-red-400 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {testimonials.length === 0 && (
              <div className="glass-card p-12 text-center">
                <MessageSquareQuote size={48} className="text-cream/30 mx-auto mb-4" />
                <p className="text-cream/50">No hay testimonios</p>
                <p className="text-cream/30 text-sm mt-2">Agrega testimonios de clientes satisfechos</p>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-cream">
                {t('admin.settings')}
              </h2>
              <button
                onClick={saveSettings}
                disabled={saving}
                className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : saved ? (
                  <Check size={16} />
                ) : (
                  <Save size={16} />
                )}
                {saving ? t('admin.saving') : saved ? t('admin.saved') : t('admin.save')}
              </button>
            </div>

            {/* Hero Image */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-cream mb-4">Foto Principal</h3>
              
              <div className="flex items-start gap-6">
                <div className="relative w-32 h-40 rounded-xl overflow-hidden bg-charcoal flex-shrink-0">
                  {settings.hero_image_url ? (
                    <Image
                      src={settings.hero_image_url}
                      alt="Hero"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-cream/30">
                      <ImageIcon size={32} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <label className="btn-outline text-sm py-2 px-4 inline-flex items-center gap-2 cursor-pointer">
                    <Upload size={16} />
                    Cambiar foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-cream/50 text-sm mt-2">
                    Esta foto aparece en la sección principal del sitio
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-cream mb-4">WhatsApp</h3>
              <div>
                <label className="block text-cream/70 text-sm mb-2">
                  Número (con código de país, sin +)
                </label>
                <input
                  type="text"
                  value={settings.whatsapp_number}
                  onChange={(e) => setSettings(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                  placeholder="5521999999999"
                  className="input-field"
                />
              </div>
            </div>

            {/* USDT Settings */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-cream mb-4">USDT / Crypto</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-cream/70 text-sm mb-2">
                    Dirección de Billetera USDT
                  </label>
                  <input
                    type="text"
                    value={settings.usdt_wallet}
                    onChange={(e) => setSettings(prev => ({ ...prev, usdt_wallet: e.target.value }))}
                    placeholder="TXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="input-field font-mono"
                  />
                </div>
                
                <div>
                  <label className="block text-cream/70 text-sm mb-2">
                    Red / Network
                  </label>
                  <select
                    value={settings.usdt_network}
                    onChange={(e) => setSettings(prev => ({ ...prev, usdt_network: e.target.value }))}
                    className="input-field"
                  >
                    <option value="TRC20">TRC20 (Tron)</option>
                    <option value="ERC20">ERC20 (Ethereum)</option>
                    <option value="BEP20">BEP20 (BSC)</option>
                    <option value="SOL">Solana</option>
                    <option value="MATIC">Polygon</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="sells_usdt"
                    checked={settings.sells_usdt}
                    onChange={(e) => setSettings(prev => ({ ...prev, sells_usdt: e.target.checked }))}
                    className="w-5 h-5 accent-primary-500"
                  />
                  <label htmlFor="sells_usdt" className="text-cream cursor-pointer">
                    También vendo USDT
                  </label>
                </div>
                <p className="text-cream/50 text-sm">
                  Si está activo, se mostrará un banner adicional en la sección de contacto
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
