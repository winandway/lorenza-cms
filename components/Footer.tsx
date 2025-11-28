'use client'

import { useLanguage } from '@/lib/i18n'
import { LogoDiamond } from './Logo'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 bg-slate-dark border-t border-primary-500/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <LogoDiamond size="sm" />
            <span className="font-display text-xl font-bold gradient-text">LORENZA</span>
          </a>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-cream/50">
            <a href="#home" className="hover:text-primary-500 transition-colors">
              {t('nav.home')}
            </a>
            <a href="#about" className="hover:text-primary-500 transition-colors">
              {t('nav.about')}
            </a>
            <a href="#projects" className="hover:text-primary-500 transition-colors">
              {t('nav.projects')}
            </a>
            <a href="#events" className="hover:text-primary-500 transition-colors">
              {t('nav.events')}
            </a>
            <a href="#contact" className="hover:text-primary-500 transition-colors">
              {t('nav.contact')}
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-sm text-cream/40 text-center md:text-right">
            <p>© {currentYear} Lorenza. {t('footer.rights')}.</p>
          </div>
        </div>

        {/* Developed by */}
        <div className="mt-8 pt-8 border-t border-primary-500/10 text-center">
          <p className="text-sm text-cream/30 flex items-center justify-center gap-2">
            {t('footer.developedBy')}{' '}
            <a 
              href="https://windoce.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500/60 hover:text-primary-500 transition-colors font-medium"
            >
              Windoce LLC
            </a>
            <span className="text-cream/20">|</span>
            <span>United States</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
