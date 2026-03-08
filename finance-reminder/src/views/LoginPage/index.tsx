import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuthController } from '@/controllers/useAuth'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  const { handleLogin, loading, error } = useAuthController()

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    handleLogin(email, password)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img
            src="/FR$.png"
            alt="Finance Reminder"
            className={styles.logo}
          />
          <h1 className={styles.title}>Finance Reminder</h1>
          <p className={styles.subtitle}>Gerencie suas contas com facilidade</p>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={styles.input}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className={styles.footer}>
          Não tem conta?{" "}
          <Link to="/register" className={styles.link}>
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}