import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import styles from './Sidebar.module.css'

// Gera as iniciais do nome para o avatar como DB
function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className={styles.sidebar}>

      {/* Logo */}
      <div className={styles.brand}>
        <span className={styles.brandIcon}>₢</span>
        <div className={styles.brandText}>
          <span className={styles.brandName}>Finance</span>
          <span className={styles.brandSub}>Reminder</span>
        </div>
      </div>

      {/* Nav principal */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Principal</p>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
          }
        >
          ◈ Dashboard
        </NavLink>

        <NavLink
          to="/bills"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
          }
        >
          💳 Contas
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
          }
        >
          📊 Relatórios
        </NavLink>
      </div>

      <hr className={styles.divider} />

      {/* Conta */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Conta</p>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
          }
        >
          👤 Perfil
        </NavLink>
      </div>

      {/* Usuário logado */}
      <div className={styles.userArea}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user?.name ? getInitials(user.name) : '?'}
          </div>
          <div>
            <p className={styles.userName}>{user?.name ?? '—'}</p>
            <p className={styles.userEmail}>{user?.email ?? '—'}</p>
          </div>
        </div>

        <button className={styles.logoutButton} onClick={handleLogout}>
          Sair
        </button>
      </div>

    </aside>
  )
}