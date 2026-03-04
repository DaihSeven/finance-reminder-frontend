import api from './axios'
import type { AuthResponse, User } from '@/types'

export const authApi = {
  register: (name: string, email: string, password: string) =>
    api.post<User>('/auth/register', { name, email, password }),

  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),
}