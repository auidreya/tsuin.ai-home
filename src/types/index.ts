export interface WaitlistEntry {
  id: string
  email: string
  source: string
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  created_at: string
}

export type FormState = 'idle' | 'loading' | 'success' | 'error'

export interface EraData {
  eyebrow?: string
  title: string
  paragraphs: string[]
  shapes: string
}
