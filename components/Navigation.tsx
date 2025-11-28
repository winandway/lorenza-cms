'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogoDiamond } from './Logo'

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#events', label: t('nav.events') },
    { href: 'https://reg.solargroup.pro/en/eqn431', label: t('nav.join'), external: true, highlight: true },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-dark/90 backdrop-blur-lg py-4 shadow-lg shadow-black/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <LogoDiamond size="md" />
          <span className="font-display text-xl font-bold gradient-text group-hover:text-primary-400 transition-colors">
            LORENZA
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`transition-colors font-medium ${
                item.highlight
                  ? 'bg-green-500 text-black px-4 py-2 rounded-full hover:bg-green-600 shadow-lg shadow-green-500/30'
                  : 'text-cream/80 hover:text-primary-500'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage('es')}
            className={`flag-btn ${language === 'es' ? 'active' : ''}`}
            aria-label="Español"
          >
            {/* Spain Flag */}
            <svg viewBox="0 0 640 480" className="w-full h-full">
              <path fill="#c60b1e" d="M0 0h640v480H0z"/>
              <path fill="#ffc400" d="M0 120h640v240H0z"/>
            </svg>
          </button>
          <button
            onClick={() => setLanguage('pt')}
            className={`flag-btn ${language === 'pt' ? 'active' : ''}`}
            aria-label="Português"
          >
            {/* Brazil Flag */}
            <svg viewBox="0 0 640 480" className="w-full h-full">
              <path fill="#229e45" d="M0 0h640v480H0z"/>
              <path fill="#f8e509" d="M320 40L40 240l280 200 280-200z"/>
              <circle fill="#2b49a3" cx="320" cy="240" r="80"/>
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden ml-4 text-cream hover:text-primary-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-dark/95 backdrop-blur-lg border-t border-primary-500/20"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors font-medium py-2 ${
                    item.highlight
                      ? 'bg-green-500 text-white px-4 rounded-full text-center hover:bg-green-600 shadow-lg shadow-green-500/30'
                      : 'text-cream/80 hover:text-primary-500'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
