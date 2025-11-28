'use client'

import { create } from 'zustand'
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  checkUser: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      return { error: error.message }
    }
    
    set({ user: data.user })
    return { error: null }
  },
  
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null })
  },
  
  checkUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    set({ user, loading: false })
  },
}))
