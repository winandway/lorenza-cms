'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { supabase, type TeamImage, type ContactInfo } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import Image from 'next/image'

// Demo images for carousel when no images in database
const demoImages = [
  '/demo/team-1.jpg',
  '/demo/team-2.jpg',
  '/demo/team-3.jpg',
  '/demo/team-4.jpg',
  '/demo/team-5.jpg',
  '/demo/team-6.jpg',
]

export default function Team() {
  const { language, t } = useLanguage()
  const [teamImages, setTeamImages] = useState<TeamImage[]>([])
  const [whatsappNumber, setWhatsappNumber] = useState('')

  useEffect(() => {
    loadContent()
  }, [])

  async function loadContent() {
    // Load team images
    const { data: images } = await supabase
      .from('team_images')
      .select('*')
      .eq('active', true)
      .order('order_index')

    if (images) setTeamImages(images)

    // Load WhatsApp number
    const { data: contact } = await supabase
      .from('contact_info')
      .select('whatsapp_number')
      .single()

    if (contact) setWhatsappNumber(contact.whatsapp_number)
  }

  // Use demo images if no images in database
  const displayImages = teamImages.length > 0 
    ? teamImages.map(img => img.image_url)
    : demoImages

  // Duplicate images for infinite scroll effect
  const scrollImages = [...displayImages, ...displayImages]

  const handleJoinTeam = () => {
    if (whatsappNumber) {
      const message = encodeURIComponent(
        language === 'es' 
          ? '¡Hola! Me interesa unirme a tu equipo.' 
          : 'Olá! Tenho interesse em fazer parte da sua equipe.'
      )
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
    }
  }

  return (
    <section id="team" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-dark" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0" />
      <div className="absolute top-40 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-10 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 px-6"
        >
          <div className="inline-flex items-center gap-3 bg-primary-500/10 text-primary-500 px-6 py-2 rounded-full mb-6">
            <Users size={20} />
            <span className="font-medium text-sm uppercase tracking-wider">
              {language === 'es' ? 'Únete' : 'Junte-se'}
            </span>
          </div>
          
          <h2 className="section-title max-w-4xl mx-auto">
            <span className="gradient-text">{t('team.title')}</span>
          </h2>
          
          <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto mt-6">
            {t('team.subtitle')}
          </p>
        </motion.div>

        {/* Infinite Carousel */}
        <div className="relative mb-16">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-dark to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-dark to-transparent z-10" />
          
          {/* Scrolling track */}
          <div className="overflow-hidden">
            <div className="carousel-track animate-scroll">
              {scrollImages.map((src, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 md:w-80 h-80 md:h-96 mx-3 rounded-2xl overflow-hidden group"
                >
                  <div className="relative w-full h-full bg-charcoal">
                    {/* Placeholder gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-charcoal" />
                    
                    {/* Image */}
                    {src && (
                      <Image
                        src={src}
                        alt={`Team member ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Question mark or silhouette overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary-500/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-display text-4xl text-primary-500">?</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center px-6"
        >
          <button
            onClick={handleJoinTeam}
            className="group inline-flex items-center gap-3 btn-primary text-lg"
          >
            <span>{t('team.join')}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
