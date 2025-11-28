'use client'

import { useLanguage } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { ExternalLink, Star, TrendingUp, Users } from 'lucide-react'

const mainProject = {
  name: 'Solar Group',
  description_es: 'Mi proyecto principal. Reuní un equipo de 9,000 personas en solo 1 año.',
  description_pt: 'Meu projeto principal. Reuni uma equipe de 9.000 pessoas em apenas 1 ano.',
  link: 'https://reg.solargroup.pro/en/eqn431',
  highlight: true,
  stats: {
    team: '9,000+',
    time: '1 año'
  }
}

const otherProjects = [
  { name: 'Herbalife', logo: '🌿' },
  { name: 'Newlife', logo: '✨' },
  { name: 'Forlife', logo: '💪' },
  { name: 'Forever', logo: '♾️' },
  { name: 'Apaysami', logo: '🌟' },
  { name: 'TLC', logo: '❤️' },
]

const digitalProjects = [
  { name: 'Winandway', result_es: 'Experiencia exitosa', result_pt: 'Experiência de sucesso' },
  { name: 'Crowone', result_es: 'Experiencia exitosa', result_pt: 'Experiência de sucesso' },
  { name: 'Iperverse', result_es: '+$150,000 USD', result_pt: '+$150.000 USD', highlight: true },
]

export default function Projects() {
  const { language, t } = useLanguage()

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-dark via-charcoal to-slate-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            <span className="gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Main Project - Solar Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Star className="text-primary-500" size={24} />
                  <span className="text-primary-500 font-semibold uppercase tracking-wider text-sm">
                    {t('projects.mainProject')}
                  </span>
                </div>

                <h3 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
                  {mainProject.name}
                </h3>

                <p className="text-cream/70 text-lg mb-6">
                  {language === 'es' ? mainProject.description_es : mainProject.description_pt}
                </p>

                <a
                  href={mainProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-black font-semibold px-8 py-4 rounded-full hover:bg-green-600 shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                >
                  {t('projects.joinNow')}
                  <ExternalLink size={18} />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 text-center">
                  <Users className="text-primary-500 mx-auto mb-3" size={32} />
                  <div className="font-display text-3xl font-bold text-cream mb-1">
                    {mainProject.stats.team}
                  </div>
                  <div className="text-cream/50 text-sm">
                    {t('projects.teamMembers')}
                  </div>
                </div>
                <div className="glass-card p-6 text-center">
                  <TrendingUp className="text-primary-500 mx-auto mb-3" size={32} />
                  <div className="font-display text-3xl font-bold text-cream mb-1">
                    {mainProject.stats.time}
                  </div>
                  <div className="text-cream/50 text-sm">
                    {t('projects.timeAchieved')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other MLM Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-cream mb-8 text-center">
            {t('projects.experience')}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center hover:border-primary-500/50 transition-colors"
              >
                <div className="text-4xl mb-3">{project.logo}</div>
                <div className="text-cream font-medium">{project.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Digital MLM Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-bold text-cream mb-8 text-center">
            {t('projects.digitalExperience')}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {digitalProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-6 text-center ${
                  project.highlight ? 'border-primary-500/50 bg-primary-500/5' : ''
                }`}
              >
                <div className="font-display text-xl font-bold text-cream mb-2">
                  {project.name}
                </div>
                <div className={`text-lg ${project.highlight ? 'text-primary-500 font-bold' : 'text-cream/60'}`}>
                  {language === 'es' ? project.result_es : project.result_pt}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
