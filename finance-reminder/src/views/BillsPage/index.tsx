
import { useState, type FormEvent } from 'react'
import { useBillsController } from '@/controllers/useBills'
import type { Bill, CreateBillDTO, BillFilters } from '@/types'
import styles from './BillsPage.module.css'

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR')
}

// ── Modal de criar conta ──────────────────────────────────
function CreateBillModal({
  onClose,
  onCreate,
  loading,
}: {
  onClose: () => void
  onCreate: (data: CreateBillDTO) => Promise<void>
  loading: boolean
}) {
  const [title, setTitle]           = useState('')
  const [amount, setAmount]         = useState('')
  const [dueDate, setDueDate]       = useState('')
  const [category, setCategory]     = useState<'FIXED' | 'VARIABLE'>('VARIABLE')
  const [recurrence, setRecurrence] = useState<'NONE' | 'MONTHLY'>('NONE')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await onCreate({ title, amount: Number(amount), dueDate, category, recurrence })
    onClose()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
    className={styles.overlay}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <button
      className={styles.overlayClose}
      onClick={onClose}
      aria-label="Fechar modal"
      tabIndex={-1}
    />

    <div
      className={styles.modal}
      onKeyDown={handleKeyDown}
    >
      <h2 id="modal-title" className={styles.modalTitle}>
        Nova Conta
      </h2>

        <form onSubmit={onSubmit} className={styles.form}>

          <div className={styles.field}>
            <label htmlFor="title-input" className={styles.label}>Título</label>
            <input
              id="title-input"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Aluguel"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="amount-input" className={styles.label}>Valor (R$)</label>
            <input
              id="amount-input"
              className={styles.input}
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="due-date-input" className={styles.label}>Vencimento</label>
            <input
              id="due-date-input"
              className={styles.input}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="DD/MM/YYYY"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="category-select" className={styles.label}>Categoria</label>
            <select
              id="category-select"
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value as 'FIXED' | 'VARIABLE')}
            >
              <option value="VARIABLE">Variável</option>
              <option value="FIXED">Fixa</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="recurrence-select" className={styles.label}>Recorrência</label>
            <select
              id="recurrence-select"
              className={styles.select}
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as 'NONE' | 'MONTHLY')}
            >
              <option value="NONE">Nenhuma</option>
              <option value="MONTHLY">Mensal</option>
            </select>
          </div>

          <div className={styles.modalActions}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

// ── Linha de conta ────────────────────────────────────────
function BillRow({
  bill,
  onPay,
  onDelete,
}: {
  bill: Bill
  onPay: (id: string) => void
  onDelete: (id: string) => void
}) {
  const isPaid = bill.status === 'PAID'

  return (
    <div className={styles.billRow}>
      <div className={styles.billLeft}>
        <span className={styles.billTitle}>{bill.title}</span>
        <div className={styles.billMeta}>
          <span className={styles.tag}>
            {bill.category === 'FIXED' ? 'Fixa' : 'Variável'}
          </span>
          <span className={styles.tag}>
            {bill.recurrence === 'MONTHLY' ? 'Mensal' : 'Única'}
          </span>
          <span>Vence {formatDate(bill.dueDate)}</span>
        </div>
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

        <button
          className={styles.deleteButton}
          onClick={() => onDelete(bill.id)}
          title="Deletar conta"
        >
          🗑
        </button>
      </div>
    </div>
  )
}

// ── Página principal ──────────────────────────────────────
export default function BillsPage() {
  const [showModal, setShowModal]   = useState(false)
  const [startDate, setStartDate]   = useState('')
  const [endDate, setEndDate]       = useState('')
  const [category, setCategory]     = useState('')
  const [recurrence, setRecurrence] = useState('')

  const {
    bills,
    loading,
    error,
    isFiltering,
    handleCreate,
    handlePay,
    handleDelete,
    handleFilter,
    handleClearFilters,
  } = useBillsController()

  function onFilter() {
    const filters: BillFilters = {}
    if (startDate)  filters.startDate  = startDate
    if (endDate)    filters.endDate    = endDate
    if (category)   filters.category   = category as 'FIXED' | 'VARIABLE'
    if (recurrence) filters.recurrence = recurrence as 'NONE' | 'MONTHLY'
    handleFilter(filters)
  }

  function onClear() {
    setStartDate('')
    setEndDate('')
    setCategory('')
    setRecurrence('')
    handleClearFilters()
  }

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Contas</h1>
          <p className={styles.subtitle}>Gerencie todas as suas contas</p>
        </div>
        <button
          className={styles.newButton}
          onClick={() => setShowModal(true)}
        >
          + Nova Conta
        </button>
      </div>

      {/* Erro */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Filtros */}
      <div className={styles.filterBar}>
        <div className={styles.filterField}>
          <label htmlFor="filter-start-date" className={styles.filterLabel}>Data início</label>
          <input
            id="filter-start-date"
            type="date"
            className={styles.filterInput}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            title="Data de início"
          />
        </div>

        <div className={styles.filterField}>
          <label htmlFor="filter-end-date" className={styles.filterLabel}>Data fim</label>
          <input
            id="filter-end-date"
            type="date"
            className={styles.filterInput}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            title="Data de fim"
          />
        </div>

        <div className={styles.filterField}>
          <label htmlFor="filter-category-select" className={styles.filterLabel}>Categoria</label>
          <select
            id="filter-category-select"
            className={styles.filterSelect}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="FIXED">Fixa</option>
            <option value="VARIABLE">Variável</option>
          </select>
        </div>

        <div className={styles.filterField}>
          <label htmlFor="filter-recurrence-select" className={styles.filterLabel}>Recorrência</label>
          <select
            id="filter-recurrence-select"
            className={styles.filterSelect}
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="NONE">Única</option>
            <option value="MONTHLY">Mensal</option>
          </select>
        </div>

        <button className={styles.filterButton} onClick={onFilter}>
          Filtrar
        </button>

        {isFiltering && (
          <button className={styles.clearButton} onClick={onClear}>
            Limpar
          </button>
        )}
      </div>

      {/* Lista */}
      <div className={styles.list}>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>
            {isFiltering ? 'Resultado do filtro' : 'Todas as contas'}
          </h2>
          <span className={styles.count}>{bills.length} conta(s)</span>
        </div>

        {bills.length === 0 ? (
          <p className={styles.emptyState}>
            {isFiltering
              ? 'Nenhuma conta encontrada para os filtros selecionados.'
              : 'Nenhuma conta cadastrada ainda. Crie sua primeira conta!'}
          </p>
        ) : (
          bills.map((bill) => (
            <BillRow
              key={bill.id}
              bill={bill}
              onPay={handlePay}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <CreateBillModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
          loading={loading}
        />
      )}

    </div>
  )
}
