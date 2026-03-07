import { useState } from 'react'
import { userApi } from '@/api/userApi'
import { useAuth } from '@/context/AuthContext'

export function useProfileController() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { user, login, token } = useAuth()

  async function handleUpdatePhone(phone: string) {
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      const res = await userApi.updatePhone(phone)

      // Atualiza o usuário no contexto com o telefone novo
      if (token) {
        login(token, res.data)
      }

      setSuccess('Telefone atualizado com sucesso!')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar telefone')
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    success,
    handleUpdatePhone,
  }
}