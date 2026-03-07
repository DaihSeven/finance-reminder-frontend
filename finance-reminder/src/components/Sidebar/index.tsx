import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import styles from './Sidebar.module.css'

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export default function Sidebar() {
  const { user, logout, avatar } = useAuth()
  const navigate          = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <>
      {/* só aparece no mobile */}
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
      >
        <img src="/menuFR$.png" alt="Menu" className={styles.menuIcon} />
      </button>

      {/* Overlay escuro — fecha o menu ao clicar fora */}
      <div
        className={`${styles.overlay} ${isOpen ? "" : styles.overlayHidden}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.brand}>
          <img src="/FR$.png" alt="Finance Reminder" className={styles.logo} />
          <div className={styles.brandText}>
            <span className={styles.brandName}>Finance</span>
            <span className={styles.brandSub}>Reminder</span>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Principal</p>

          <NavLink
            to="/dashboard"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
          >
           <img src="/DashboardFR$.png" alt="Dashboard" className={styles.logos} /> Dashboard
          </NavLink>

          <NavLink
            to="/bills"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
          >
            <img src="/ContaFR$.png" alt="Contas" className={styles.logos} />Contas
          </NavLink>

          <NavLink
            to="/reports"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
          >
            <img src="/relatorioFR$.png" alt="relatórios" className={styles.logos} />Relatórios
          </NavLink>
        </div>

        <hr className={styles.divider} />

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Conta</p>

          <NavLink
            to="/profile"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
          >
            <img src="/PerfilFR$.png" alt="Perfil" className={styles.logos} /> Perfil
          </NavLink>
        </div>

        <div className={styles.userArea}>
          <div className={styles.userInfo}>

            {/* Avatar — imagem ou iniciais */}
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className={styles.avatarImg}
              />
            ) : (
              <div className={styles.avatar}>
                {user?.name ? getInitials(user.name) : '?'}
              </div>
            )}

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
    </>
  );
}