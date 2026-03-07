import { useState, type FormEvent } from 'react'
import { useProfileController } from '@/controllers/useProfile'
import styles from './ProfilePage.module.css'

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function ProfilePage() {
  const { user, loading, error, success, handleUpdatePhone } = useProfileController()

  const [phone, setPhone] = useState(user?.phone ?? '')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    handleUpdatePhone(phone)
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Perfil</h1>
        <p className={styles.subtitle}>Suas informações pessoais</p>
      </div>

      {/* Card do usuário */}
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {user?.name ? getInitials(user.name) : '?'}
        </div>

        <div className={styles.userInfo}>
          <span className={styles.userName}>{user?.name ?? '—'}</span>
          <span className={styles.userEmail}>{user?.email ?? '—'}</span>

          {user?.phone && (
            <span className={styles.userPhone}>📱 {user.phone}</span>
          )}

          {user?.createdAt && (
            <span className={styles.userSince}>
              Membro desde {formatDate(user.createdAt)}
            </span>
          )}
        </div>
      </div>

      {/* Formulário de telefone */}
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Atualizar telefone</h2>

        <form onSubmit={onSubmit} className={styles.form}>

          <div className={styles.field}>
            <label className={styles.label}>Telefone</label>
            <input
              className={styles.input}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: 41999998888"
              autoComplete="tel"
            />
            <span className={styles.hint}>
              Somente números com DDD. Ex: 41999998888
            </span>
          </div>

          {error   && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Salvando...' : 'Salvar telefone'}
          </button>

        </form>
      </div>

      {/* Badge JWT */}
      <div className={styles.jwtCard}>
        <div className={styles.jwtDot} />
        <span className={styles.jwtText}>
          Sessão ativa —
        </span>
        <span className={styles.jwtBadge}>
          JWT autenticado · v2
        </span>
      </div>

    </div>
  )
}
