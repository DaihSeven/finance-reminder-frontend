
import { Link } from 'react-router-dom'
import { useReportsController } from '@/controllers/useReports'
import styles from './DashboardPage.module.css'
import type { Bill } from '@/types'

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR')
}

function BillRow({ bill, onPay }: { bill: Bill; onPay: (id: string) => void }) {
  const isPaid = bill.status === 'PAID'

  return (
    <div className={styles.billRow}>
      <div className={styles.billLeft}>
        <span className={styles.billTitle}>{bill.title}</span>
        <span className={styles.billMeta}>
          {bill.category === 'FIXED' ? 'Fixa' : 'Variável'} · Vence {formatDate(bill.dueDate)}
        </span>
      </div>

      <div className={styles.billRight}>
        <span className={styles.billAmount}>
          {formatCurrency(bill.amount)}
        </span>

        {isPaid ? (
          <span className={styles.paidBadge}>✓ Pago</span>
        ) : (
          <button
            className={styles.payButton}
            onClick={() => onPay(bill.id)}
          >
            Pagar
          </button>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const {
    dashboard,
    bills,
    loading,
    error,
    handlePay,
    handleExportCsv,
    handleExportPdf,
  } = useReportsController()

  const soonAmount = bills
    .filter((b) => {
      if (b.status === 'PAID') return false
      const diff = (new Date(b.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      return diff <= 3 && diff >= 0
    })
    .reduce((sum, b) => sum + b.amount, 0)

  const recentBills = bills.slice(0, 5)

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className={styles.exportButtons}>
          <button className={styles.exportBtn} onClick={handleExportCsv}>
            ⬇ CSV
          </button>
          
          <button className={styles.exportBtn} onClick={handleExportPdf}>
            📄 PDF
          </button>
        </div>
      </div>

      {/* Erro */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Cards de resumo */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <p className={styles.cardLabel}>💰 Total pendente</p>
          <p className={`${styles.cardValue} ${styles.cardValuePending}`}>
            {formatCurrency(dashboard?.summary.totalPendingAmount ?? 0)}
          </p>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>✅ Total pago</p>
          <p className={`${styles.cardValue} ${styles.cardValuePaid}`}>
            {formatCurrency(dashboard?.summary.totalPaidAmount ?? 0)}
          </p>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>⚡ Vence em breve</p>
          <p className={`${styles.cardValue} ${styles.cardValueSoon}`}>
            {formatCurrency(soonAmount)}
          </p>
        </div>
      </div>

      {/* Lista de contas */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Contas recentes</h2>
          <Link to="/bills" className={styles.seeAll}>
            Ver todas →
          </Link>
        </div>

        {recentBills.length === 0 ? (
          <p className={styles.emptyState}>Nenhuma conta cadastrada ainda.</p>
        ) : (
          recentBills.map((bill) => (
            <BillRow
              key={bill.id}
              bill={bill}
              onPay={handlePay}
            />
          ))
        )}
      </div>

    </div>
  )
}