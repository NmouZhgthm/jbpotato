import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Message = {
  id: number
  created_at: string
  type: 'message' | 'bug' | 'chat'
  name: string
  email: string | null
  content: string
  bug_type?: string
  priority?: 'low' | 'medium' | 'high'
  chat_type?: string
} 