import { useState, useEffect } from 'react'
import { reportApi } from '@/api/reportApi'
import { billApi } from '@/api/billApi'
import type { Dashboard, Bill, MonthlyHistory, Summary } from '@/types'

export function useReportsController() {
  const [dashboard, setDashboard]   = useState<Dashboard | null>(null)
  const [summary, setSummary]       = useState<Summary | null>(null)
  const [history, setHistory]       = useState<MonthlyHistory[]>([])
  const [bills, setBills]           = useState<Bill[]>([])
  const [loading, setLoading]       = useState(true)
  const [emailLoading, setEmailLoading] = useState<string | null>(null)
  const [error, setError]           = useState<string | null>(null)
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null)

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    try {
      setLoading(true)
      setError(null)

      const [dashRes, billsRes, summaryRes, historyRes] = await Promise.all([
        reportApi.getDashboard(),
        billApi.getAll(),
        reportApi.getSummary(),
        reportApi.getHistory(),
      ])

      setDashboard(dashRes.data)
      setBills(billsRes.data)
      setSummary(summaryRes.data)
      setHistory(historyRes.data)
    } catch {
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  async function handlePay(id: string) {
    try {
      await billApi.pay(id)
      await loadAll()
    } catch {
      setError('Erro ao pagar conta')
    }
  }

  async function handleExportCsv() {
    try {
      const res  = await reportApi.exportCsv()
      const url  = URL.createObjectURL(new Blob([res.data]))
      const a    = document.createElement('a')
      a.href     = url
      a.download = 'contas.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('Erro ao exportar CSV')
    }
  }

  async function handleExportPdf() {
    try {
      const res  = await reportApi.exportPdf()
      const url  = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const a    = document.createElement('a')
      a.href     = url
      a.download = 'contas.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('Erro ao exportar PDF')
    }
  }

  async function handleEmailCsv() {
    try {
      setEmailLoading('csv')
      setEmailSuccess(null)
      setError(null)
      await reportApi.emailCsv()
      setEmailSuccess('Relatório CSV enviado para seu e-mail!')
    } catch {
      setError('Erro ao enviar CSV por e-mail')
    } finally {
      setEmailLoading(null)
    }
  }

  async function handleEmailPdf() {
    try {
      setEmailLoading('pdf')
      setEmailSuccess(null)
      setError(null)
      await reportApi.emailPdf()
      setEmailSuccess('Relatório PDF enviado para seu e-mail!')
    } catch {
      setError('Erro ao enviar PDF por e-mail')
    } finally {
      setEmailLoading(null)
    }
  }

  return {
    dashboard,
    summary,
    history,
    bills,
    loading,
    emailLoading,
    error,
    emailSuccess,
    handlePay,
    handleExportCsv,
    handleExportPdf,
    handleEmailCsv,
    handleEmailPdf,
  }
}