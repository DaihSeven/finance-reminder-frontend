import {createContext, useContext, useState, useEffect, useMemo} from 'react'
import type { ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextData {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  avatar: string | null
  login: (token: string, user: User) => void
  logout: () => void
  updateAvatar: (avatar: string) => void
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [avatar, setAvatar] = useState<string | null>(null)

  // Ao carregar o app, verificar se já existe sessão salva
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser  = localStorage.getItem('user')
    const savedAvatar = localStorage.getItem('avatar')

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }

    if (savedAvatar) {
      setAvatar(savedAvatar)
    }
  }, [])

  function login(token: string, user: User) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setToken(token)
    setUser(user)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('avatar')
    setToken(null)
    setUser(null)
    setAvatar(null)
  }

  function updateAvatar(newAvatar: string) {
    localStorage.setItem('avatar', newAvatar)
    setAvatar(newAvatar)
  }

const value = useMemo(() => ({
        user,
        token,
        avatar,
        isAuthenticated: !!token,
        login,
        logout,
        updateAvatar,
}), [user, token])
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}