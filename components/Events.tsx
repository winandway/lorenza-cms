'use client'

import { useLanguage } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Calendar, MapPin, Users, Award } from 'lucide-react'
import { useState, useEffect } from 'react'

// Imágenes para el slider de la primera tarjeta (todas de images2 excepto perfil)
const sliderImages = [
  '/images2/lorenzapy-evento-solar-group-2024-1.jpg',
  '/images2/lorenzapy-evento-solar-group-2024-2.jpg',
  '/images2/lorenzapy-evento-solar-group-2024-3.jpg',
  '/images2/lorenzapy-evento-solar-group-2025-1.jpg',
  '/images2/lorenzapy-evento-solar-group-2025-2.jpg',
]

const events = [
  {
    image: '/images2/lorenzapy-evento-solar-group-2024-1.jpg',
    title_es: 'Eventos Solar Group',
    title_pt: 'Eventos Solar Group',
    location: 'Internacional',
    year: '2024-2025',
  },
  {
    image: '/images2/lorenzapy-evento-solar-group-2024-2.jpg',
    title_es: 'Reconocimiento Líderes',
    title_pt: 'Reconhecimento Líderes',
    location: 'Solar Group',
    year: '2024',
  },
  {
    image: '/images2/lorenzapy-evento-solar-group-2024-3.jpg',
    title_es: 'Evento de Networking',
    title_pt: 'Evento de Networking',
    location: 'Internacional',
    year: '2024',
  },
  {
    image: '/images2/lorenzapy-evento-solar-group-2025-1.jpg',
    title_es: 'Cumbre de Líderes 2025',
    title_pt: 'Cúpula de Líderes 2025',
    location: 'Internacional',
    year: '2025',
  },
  {
    image: '/images2/lorenzapy-evento-solar-group-2025-2.jpg',
    title_es: 'Expansión Global 2025',
    title_pt: 'Expansão Global 2025',
    location: 'Internacional',
    year: '2025',
  },
]

const stats = [
  { icon: Calendar, value: '50+', label_es: 'Eventos', label_pt: 'Eventos' },
  { icon: MapPin, value: '15+', label_es: 'Países', label_pt: 'Países' },
  { icon: Users, value: '9,000+', label_es: 'Personas capacitadas', label_pt: 'Pessoas capacitadas' },
  { icon: Award, value: '20+', label_es: 'Reconocimientos', label_pt: 'Reconhecimentos' },
]

export default function Events() {
  const { language, t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 4000) // Cambia cada 4 segundos
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="events" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-slate-dark to-charcoal" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-semibold uppercase tracking-wider text-sm mb-4 block">
            {language === 'es' ? 'Presencia Internacional' : 'Presença Internacional'}
          </span>
          <h2 className="section-title mb-4">
            <span className="gradient-text">
              {language === 'es' ? 'Eventos 2024 - 2025' : 'Eventos 2024 - 2025'}
            </span>
          </h2>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            {language === 'es'
              ? 'Participando activamente en convenciones internacionales y eventos de liderazgo junto a los mejores del mundo'
              : 'Participando ativamente em convenções internacionais e eventos de liderança com os melhores do mundo'}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="glass-card p-6 text-center">
              <stat.icon className="text-primary-500 mx-auto mb-3" size={28} />
              <div className="font-display text-2xl md:text-3xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-cream/50 text-sm">
                {language === 'es' ? stat.label_es : stat.label_pt}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Events Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <div className="glass-card overflow-hidden h-full">
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden">
                  {index === 0 ? (
                    // Slider para la primera tarjeta
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={sliderImages[currentSlide]}
                          alt={language === 'es' ? event.title_es : event.title_pt}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    // Imagen fija para las demás tarjetas
                    <Image
                      src={event.image}
                      alt={language === 'es' ? event.title_es : event.title_pt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/20 to-transparent" />

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {index === 0 ? '2024-2025' : event.year}
                  </div>

                  {/* Slider indicators para la primera tarjeta */}
                  {index === 0 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {sliderImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentSlide(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === currentSlide ? 'bg-primary-500 w-6' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-cream mb-2 group-hover:text-primary-500 transition-colors">
                    {language === 'es' ? event.title_es : event.title_pt}
                  </h3>
                  <div className="flex items-center gap-2 text-cream/50 text-sm">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-cream/60 text-lg mb-6">
            {language === 'es'
              ? '¿Quieres ser parte de los próximos eventos?'
              : 'Quer fazer parte dos próximos eventos?'}
          </p>
          <a
            href="https://reg.solargroup.pro/en/eqn431"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-black font-semibold px-8 py-4 rounded-full hover:bg-green-600 shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            {language === 'es' ? 'Únete al Equipo' : 'Junte-se à Equipe'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
