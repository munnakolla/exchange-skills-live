import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Fix for localhost authentication issues
    storage: window.localStorage,
    storageKey: 'supabase.auth.token',
    flowType: 'pkce'
  },
  global: {
    headers: {
      'x-application-name': 'exchange-skills-live'
    }
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          location: string
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          location: string
          bio?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          location?: string
          bio?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          user_id: string
          name: string
          category: string
          level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          is_teaching: boolean
          is_learning: boolean
          created_at: string
        }
        Insert: {
          user_id: string
          name: string
          category: string
          level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          is_teaching?: boolean
          is_learning?: boolean
        }
        Update: {
          name?: string
          category?: string
          level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          is_teaching?: boolean
          is_learning?: boolean
        }
      }
      sessions: {
        Row: {
          id: string
          teacher_id: string
          learner_id: string
          skill_id: string
          scheduled_at: string
          duration_minutes: number
          status: 'scheduled' | 'completed' | 'cancelled'
          notes: string | null
          created_at: string
        }
        Insert: {
          teacher_id: string
          learner_id: string
          skill_id: string
          scheduled_at: string
          duration_minutes: number
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
        }
        Update: {
          scheduled_at?: string
          duration_minutes?: number
          status?: 'scheduled' | 'completed' | 'cancelled'
          notes?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          session_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          session_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
        }
        Update: {
          rating?: number
          comment?: string | null
        }
      }
    }
  }
}
