'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { supabase, type ContactInfo } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

const heroImages = [
  '/images/lorenzapy-consultora-negocios-1.jpg',
  '/images/lorenzapy-consultora-negocios-2.png',
  '/images/lorenzapy-consultora-negocios-3.jpg',
  '/images/lorenzapy-consultora-negocios-4.jpg',
  '/images/lorenzapy-consultora-negocios-5.jpg',
]

export default function Hero() {
  const { language, t } = useLanguage()
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [heroContent, setHeroContent] = useState<{
    name: string
    subtitle: string
  }>({
    name: 'Lorenza Gonzalez',
    subtitle: language === 'es'
      ? 'Líder en mercadeo en red con +20 años de experiencia. Resultados comprobados.'
      : 'Líder em marketing de rede com +20 anos de experiência. Resultados comprovados.'
  })

  // Slider automático cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    loadContent()
  }, [language])

  async function loadContent() {
    // Load contact info (includes hero image)
    const { data: contact } = await supabase
      .from('contact_info')
      .select('*')
      .single()
    
    if (contact) setContactInfo(contact)

    // Load hero content
    const { data: content } = await supabase
      .from('site_content')
      .select('*')
      .in('key', ['hero_name', 'hero_subtitle'])

    if (content) {
      const nameItem = content.find(c => c.key === 'hero_name')
      const subtitleItem = content.find(c => c.key === 'hero_subtitle')
      
      setHeroContent({
        name: nameItem ? (language === 'es' ? nameItem.value_es : nameItem.value_pt) : 'Lorenza',
        subtitle: subtitleItem 
          ? (language === 'es' ? subtitleItem.value_es : subtitleItem.value_pt) 
          : t('hero.subtitle')
      })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-dark via-charcoal to-slate-dark" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      {/* Gold accent lines */}
      <div className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-primary-500/50 to-transparent" />
      <div className="absolute bottom-0 right-1/3 w-px h-32 bg-gradient-to-t from-primary-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-primary-500 font-accent text-xl md:text-2xl italic mb-4"
            >
              {t('hero.greeting')}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="gradient-text glow-text">{heroContent.name}</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-cream/70 text-lg md:text-xl lg:text-2xl max-w-xl mx-auto lg:mx-0 mb-8 font-light leading-relaxed"
            >
              {heroContent.subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://reg.solargroup.pro/en/eqn431"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-black font-semibold px-8 py-4 rounded-full hover:bg-green-600 shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 text-lg"
              >
                {t('hero.joinNow')}
              </a>
              <a href="#about" className="btn-outline">
                {t('hero.cta')}
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-full aspect-[720/1280] max-w-sm mx-auto">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-primary-500/30 rounded-3xl transform rotate-3" />
              <div className="absolute -inset-4 border-2 border-primary-500/20 rounded-3xl transform -rotate-2" />
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden glow">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroImages[currentImageIndex]}
                      alt={`Lorenzapy consultora de negocios ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/60 via-transparent to-transparent z-10" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-primary-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-primary-500/30"
              >
                +20 {language === 'es' ? 'años' : 'anos'}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary-500/60"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  )
}
