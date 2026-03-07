import { useReportsController } from '@/controllers/useReports'
import styles from './ReportsPage.module.css'

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function ReportsPage() {
  const {
    summary,
    history,
    loading,
    emailLoading,
    error,
    emailSuccess,
    handleExportCsv,
    handleExportPdf,
    handleEmailCsv,
    handleEmailPdf,
  } = useReportsController()

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Relatórios</h1>
        <p className={styles.subtitle}>Visão geral das suas finanças</p>
      </div>

      {error        && <p className={styles.error}>{error}</p>}
      {emailSuccess && <p className={styles.success}>✅ {emailSuccess}</p>}


      <div className={styles.cards}>
        <div className={styles.card}>
          <p className={styles.cardLabel}>📋 Total de contas</p>
          <p className={styles.cardValue}>{summary?.total ?? 0}</p>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>⏳ Pendentes</p>
          <p className={`${styles.cardValue} ${styles.cardValuePending}`}>
            {summary?.pending ?? 0}
          </p>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>✅ Pagas</p>
          <p className={`${styles.cardValue} ${styles.cardValuePaid}`}>
            {summary?.paid ?? 0}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>📅 Histórico Mensal</h2>

        {history.length === 0 ? (
          <p className={styles.emptyState}>Nenhum histórico disponível.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mês</th>
                <th>Total</th>
                <th>Pagas</th>
                <th>Pendentes</th>
                <th>Valor total</th>
                <th>Valor pago</th>
                <th>Valor pendente</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.month}>
                  <td>{item.month}</td>
                  <td>{item.total}</td>
                  <td className={styles.paid}>{item.paid}</td>
                  <td className={styles.pending}>{item.pending}</td>
                  <td>{formatCurrency(item.totalAmount)}</td>
                  <td className={styles.paid}>{formatCurrency(item.paidAmount)}</td>
                  <td className={styles.pending}>{formatCurrency(item.pendingAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>📤 Exportar relatório</h2>

        <div className={styles.exportGrid}>

          <div className={styles.exportGroup}>
            <span className={styles.exportGroupTitle}>⬇ Download</span>

            <button
              className={styles.exportButton}
              onClick={handleExportCsv}
            >
              ⬇ Baixar CSV
            </button>

            <button
              className={styles.exportButton}
              onClick={handleExportPdf}
            >
              📄 Baixar PDF
            </button>
          </div>

          <div className={styles.exportGroup}>
            <span className={styles.exportGroupTitle}>📧 Enviar por e-mail</span>

            <button
              className={styles.emailButton}
              onClick={handleEmailCsv}
              disabled={emailLoading === 'csv'}
            >
              {emailLoading === 'csv' ? 'Enviando...' : '📧 Enviar CSV por e-mail'}
            </button>

            <button
              className={styles.emailButton}
              onClick={handleEmailPdf}
              disabled={emailLoading === 'pdf'}
            >
              {emailLoading === 'pdf' ? 'Enviando...' : '📧 Enviar PDF por e-mail'}
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}