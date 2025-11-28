'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { supabase, type CareerHighlight, type SiteContent } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Award, Briefcase, Users, TrendingUp, Star, Target } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  award: <Award size={32} />,
  briefcase: <Briefcase size={32} />,
  users: <Users size={32} />,
  trending: <TrendingUp size={32} />,
  star: <Star size={32} />,
  target: <Target size={32} />,
}

// Default highlights if none in database
const defaultHighlights = [
  {
    id: '1',
    icon: 'award',
    title_es: 'Experiencia Comprobada',
    title_pt: 'Experiência Comprovada',
    description_es: 'Más de 10 años transformando negocios y creando oportunidades de crecimiento.',
    description_pt: 'Mais de 10 anos transformando negócios e criando oportunidades de crescimento.',
    order_index: 1,
    created_at: ''
  },
  {
    id: '2',
    icon: 'users',
    title_es: 'Equipo de Éxito',
    title_pt: 'Equipe de Sucesso',
    description_es: 'Liderando equipos comprometidos hacia metas extraordinarias.',
    description_pt: 'Liderando equipes comprometidas rumo a metas extraordinárias.',
    order_index: 2,
    created_at: ''
  },
  {
    id: '3',
    icon: 'trending',
    title_es: 'Resultados Reales',
    title_pt: 'Resultados Reais',
    description_es: 'Estrategias probadas que generan crecimiento sostenible.',
    description_pt: 'Estratégias comprovadas que geram crescimento sustentável.',
    order_index: 3,
    created_at: ''
  }
]

export default function About() {
  const { language, t } = useLanguage()
  const [highlights, setHighlights] = useState<CareerHighlight[]>(defaultHighlights as CareerHighlight[])
  const [aboutContent, setAboutContent] = useState<{
    title: string
    subtitle: string
    description: string
  }>({
    title: t('about.title'),
    subtitle: t('about.subtitle'),
    description: ''
  })

  useEffect(() => {
    loadContent()
  }, [language])

  async function loadContent() {
    // Load career highlights
    const { data: highlightsData } = await supabase
      .from('career_highlights')
      .select('*')
      .order('order_index')

    if (highlightsData && highlightsData.length > 0) {
      setHighlights(highlightsData)
    }

    // Load about content
    const { data: content } = await supabase
      .from('site_content')
      .select('*')
      .in('key', ['about_title', 'about_subtitle', 'about_description'])

    if (content) {
      const titleItem = content.find(c => c.key === 'about_title')
      const subtitleItem = content.find(c => c.key === 'about_subtitle')
      const descItem = content.find(c => c.key === 'about_description')
      
      setAboutContent({
        title: titleItem ? (language === 'es' ? titleItem.value_es : titleItem.value_pt) : t('about.title'),
        subtitle: subtitleItem ? (language === 'es' ? subtitleItem.value_es : subtitleItem.value_pt) : t('about.subtitle'),
        description: descItem ? (language === 'es' ? descItem.value_es : descItem.value_pt) : ''
      })
    }
  }

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      
      {/* Decorative */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-primary-500 font-accent text-lg italic mb-4">
            {aboutContent.subtitle}
          </span>
          <h2 className="section-title">
            <span className="gradient-text">{aboutContent.title}</span>
          </h2>
          {aboutContent.description && (
            <p className="text-cream/70 text-lg max-w-2xl mx-auto mt-6">
              {aboutContent.description}
            </p>
          )}
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card p-8 h-full transition-all duration-500 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6 group-hover:bg-primary-500/20 transition-colors">
                  {iconMap[highlight.icon] || <Star size={32} />}
                </div>
                
                {/* Content */}
                <h3 className="font-display text-xl md:text-2xl font-bold text-cream mb-4">
                  {language === 'es' ? highlight.title_es : highlight.title_pt}
                </h3>
                <p className="text-cream/60 leading-relaxed">
                  {language === 'es' ? highlight.description_es : highlight.description_pt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
