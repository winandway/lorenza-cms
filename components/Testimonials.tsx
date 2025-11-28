'use client'

import { useLanguage } from '@/lib/i18n'
import { supabase, Testimonial } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

// Testimonios por defecto (fallback)
const defaultTestimonials = [
  {
    id: '1',
    name: 'María García',
    role_es: 'Miembro del equipo',
    role_pt: 'Membro da equipe',
    text_es: 'Gracias a Lorenza logré alcanzar mis metas financieras en tiempo récord. Su liderazgo y mentoría son invaluables.',
    text_pt: 'Graças à Lorenza consegui alcançar minhas metas financeiras em tempo recorde. Sua liderança e mentoria são inestimáveis.',
    rating: 5,
    order_index: 0,
    active: true,
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    role_es: 'Líder de equipo',
    role_pt: 'Líder de equipe',
    text_es: 'El sistema de trabajo de Lorenza es efectivo y comprobado. En 6 meses dupliqué mis ingresos.',
    text_pt: 'O sistema de trabalho da Lorenza é eficaz e comprovado. Em 6 meses dobrei minha renda.',
    rating: 5,
    order_index: 1,
    active: true,
  },
  {
    id: '3',
    name: 'Ana Martínez',
    role_es: 'Emprendedora',
    role_pt: 'Empreendedora',
    text_es: 'Nunca pensé que podría tener mi propio negocio. Lorenza me mostró el camino y me acompañó en cada paso.',
    text_pt: 'Nunca pensei que poderia ter meu próprio negócio. Lorenza me mostrou o caminho e me acompanhou em cada passo.',
    rating: 5,
    order_index: 2,
    active: true,
  },
]

const stats = [
  { value: '20+', label_es: 'Años de experiencia', label_pt: 'Anos de experiência' },
  { value: '9,000+', label_es: 'Personas en el equipo', label_pt: 'Pessoas na equipe' },
  { value: '$150K+', label_es: 'Ganancias en MLM digital', label_pt: 'Ganhos em MLM digital' },
]

export default function Testimonials() {
  const { language, t } = useLanguage()
  const [testimonials, setTestimonials] = useState<Partial<Testimonial>[]>(defaultTestimonials)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('active', true)
          .order('order_index', { ascending: true })

        if (!error && data && data.length > 0) {
          setTestimonials(data)
        }
        // Si hay error o no hay datos, se mantienen los testimonios por defecto
      } catch {
        // Silenciar error - usar testimonios por defecto
        console.log('Usando testimonios por defecto')
      }
    }
    loadTestimonials()
  }, [])

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            <span className="gradient-text">{t('testimonials.title')}</span>
          </h2>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-3xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-cream/60 text-sm md:text-base">
                {language === 'es' ? stat.label_es : stat.label_pt}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 relative"
            >
              {/* Quote icon */}
              <Quote className="text-primary-500/30 absolute top-4 right-4" size={32} />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-primary-500 fill-primary-500" size={16} />
                ))}
              </div>

              {/* Text */}
              <p className="text-cream/80 mb-6 italic">
                "{language === 'es' ? testimonial.text_es : testimonial.text_pt}"
              </p>

              {/* Author */}
              <div>
                <div className="font-bold text-cream">{testimonial.name}</div>
                <div className="text-cream/50 text-sm">
                  {language === 'es' ? testimonial.role_es : testimonial.role_pt}
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
          <p className="text-cream/70 text-lg mb-6">
            {t('testimonials.cta')}
          </p>
          <a
            href="https://reg.solargroup.pro/en/eqn431"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-black font-semibold px-8 py-4 rounded-full hover:bg-green-600 shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            {t('testimonials.joinTeam')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
