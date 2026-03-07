import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { JSX } from 'react'
import MainLayout    from '@/components/MainLayout'
import LoginPage    from '@/views/LoginPage'
import RegisterPage from '@/views/RegisterPage'
import DashboardPage from '@/views/DashboardPage'
import BillsPage    from '@/views/BillsPage'
import ProfilePage  from '@/views/ProfilePage'
import ReportsPage from '@/views/ReportsPage'

// Componente que protege rotas privadas
function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
    ? <MainLayout>{children}</MainLayout>  
    : <Navigate to="/login" replace />
}

// Componente que redireciona usuário já logado para fora do login
function PublicRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rotas públicas */}
        <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

         {/*Rotas privadas */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/bills"     element={<PrivateRoute><BillsPage /></PrivateRoute>} />
        <Route path="/profile"   element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        {/* Rota padrão */}
      </Routes>
    </BrowserRouter>
  )
}