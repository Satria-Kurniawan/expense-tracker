export interface User {
  id: number | string
  name: string
  email: string
  email_verified_at?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  name: string
  password_confirmation: string
}
