'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n'
import { supabase, type ContactInfo } from '@/lib/supabase'
import { motion } from 'framer-motion'
import {
  Copy,
  Check,
  MessageCircle,
  Wallet,
  Network,
  DollarSign,
  ArrowUpRight,
  Users,
  Mail
} from 'lucide-react'
import Image from 'next/image'

// Datos de contacto por defecto
const defaultContact = {
  whatsapp_number: '595982256688',
  email: 'hello@lorenzapy.com',
  whatsapp_group: 'https://chat.whatsapp.com/L4Hc3rm62xH4ZVCN9uSxUI',
  usdt_wallet: '',
  usdt_network: 'TRC20',
  sells_usdt: false
}

export default function Contact() {
  const { language, t } = useLanguage()
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    loadContent()
  }, [])

  async function loadContent() {
    const { data } = await supabase
      .from('contact_info')
      .select('*')
      .single()

    if (data) setContactInfo(data)
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const whatsappNumber = contactInfo?.whatsapp_number || defaultContact.whatsapp_number

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      language === 'es'
        ? '¡Hola Lorenza! Me gustaría saber más sobre tu equipo.'
        : 'Olá Lorenza! Gostaria de saber mais sobre sua equipe.'
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  const handleWhatsAppGroup = () => {
    window.open(defaultContact.whatsapp_group, '_blank')
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      
      {/* Decorative */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl" />

            {/* Circle border */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary-500/50 p-1 bg-charcoal">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/images2/lorenzapy-contacto-perfil.png"
                  alt="Lorenza Gonzalez - Contacto"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -inset-2 border-2 border-primary-500/20 rounded-full" />
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-title mb-4">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-cream/60 text-lg md:text-xl">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* WhatsApp Directo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              onClick={handleWhatsApp}
              className="glass-card p-8 cursor-pointer group hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">
                  <MessageCircle size={32} />
                </div>
                <ArrowUpRight size={24} className="text-cream/30 group-hover:text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              <h3 className="font-display text-2xl font-bold text-cream mb-2">
                {t('contact.whatsapp')}
              </h3>
              <p className="text-cream/60 text-lg">
                +595 982 256688
              </p>
              <p className="text-cream/40 text-sm mt-2">
                {language === 'es' ? 'Escríbeme directamente' : 'Escreva-me diretamente'}
              </p>
            </div>
          </motion.div>

          {/* Grupo WhatsApp Solar Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              onClick={handleWhatsAppGroup}
              className="glass-card p-8 cursor-pointer group hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center text-primary-500">
                  <Users size={32} />
                </div>
                <ArrowUpRight size={24} className="text-cream/30 group-hover:text-primary-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              <h3 className="font-display text-2xl font-bold text-cream mb-2">
                {t('contact.group')}
              </h3>
              <p className="text-cream/60 text-lg">
                Solar Group Internacional
              </p>
              <p className="text-cream/40 text-sm mt-2">
                {language === 'es' ? 'Únete a la comunidad' : 'Junte-se à comunidade'}
              </p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href={`mailto:${defaultContact.email}`}
              className="glass-card p-8 cursor-pointer group hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full block"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Mail size={32} />
                </div>
                <ArrowUpRight size={24} className="text-cream/30 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              <h3 className="font-display text-2xl font-bold text-cream mb-2">
                Email
              </h3>
              <p className="text-cream/60 text-lg">
                {defaultContact.email}
              </p>
              <p className="text-cream/40 text-sm mt-2">
                {language === 'es' ? 'Contacto profesional' : 'Contato profissional'}
              </p>
            </a>
          </motion.div>
        </div>

        {/* Sells USDT Banner */}
        {contactInfo?.sells_usdt && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-5xl mx-auto"
          >
            <div 
              onClick={handleWhatsApp}
              className="glass-card p-6 md:p-8 cursor-pointer group hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/30 to-gold-700/30 flex items-center justify-center">
                  <DollarSign size={32} className="text-primary-500" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-display text-xl md:text-2xl font-bold text-cream mb-2">
                    {t('contact.sellsUsdt')}
                  </h4>
                  <p className="text-cream/60">
                    {t('contact.sellsUsdtDesc')}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-primary-500 group-hover:translate-x-1 transition-transform">
                  <span className="font-medium">{t('contact.whatsapp')}</span>
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
