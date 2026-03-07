import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/api/authApi'
import { useAuth } from '@/context/AuthContext'

export function useAuthController() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const { login } = useAuth()
  const navigate  = useNavigate()

  async function handleLogin(email: string, password: string) {
    try {
      setLoading(true)
      setError(null)

      const { data } = await authApi.login(email, password)

      const savedUser    = localStorage.getItem('user')
      const existingUser = savedUser ? JSON.parse(savedUser) : null

      const user = existingUser?.email === email
        ? existingUser
        : { id: '', name: email.split('@')[0], email, phone: undefined, createdAt: '', updatedAt: '' }

      login(data.token, user)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(name: string, email: string, password: string) {
    try {
      setLoading(true)
      setError(null)

      await authApi.register(name, email, password)
      await handleLogin(email, password)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return { handleLogin, handleRegister, loading, error }
}