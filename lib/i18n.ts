'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import es from '@/translations/es.json'
import pt from '@/translations/pt.json'

type Language = 'es' | 'pt'

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = { es, pt }

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let result: unknown = obj
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key]
    } else {
      return path
    }
  }
  
  return typeof result === 'string' ? result : path
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'es',
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const { language } = get()
        return getNestedValue(translations[language] as Record<string, unknown>, key)
      },
    }),
    {
      name: 'language-storage',
    }
  )
)
