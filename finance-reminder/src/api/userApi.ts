import api from './axios'
import type { User } from '@/types'

export const userApi = {
  updatePhone: (phone: string) =>
    api.patch<User>('/users/me', { phone }),

   getMe: () =>
    api.get<User>('/users/me'), 
}