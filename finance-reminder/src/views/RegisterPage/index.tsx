import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuthController } from '@/controllers/useAuth'
import styles from './RegisterPage.module.css'

export default function RegisterPage() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  const { handleRegister, loading, error } = useAuthController()

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    handleRegister(name, email, password)
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
          <h1 className={styles.title}>Criar conta</h1>
          <p className={styles.subtitle}>Comece a controlar suas finanças</p>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="nome" className={styles.label}>Nome</label>
            <input
              id="nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>E-mail</label>
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
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              className={styles.input}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>

        </form>

        <p className={styles.footer}>
          Já tem conta?{' '}
          <Link to="/login" className={styles.link}>
            Entrar
          </Link>
        </p>

      </div>
    </div>
  )
}