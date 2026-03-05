
import { useState, useEffect } from 'react'
import { reportApi } from '@/api/reportApi'
import { billApi } from '@/api/billApi'
import type { Dashboard, Bill } from '@/types'

export function useReportsController() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  const [bills, setBills]         = useState<Bill[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    try {
      setLoading(true)
      setError(null)

      const [dashRes, billsRes] = await Promise.all([
        reportApi.getDashboard(),
        billApi.getAll(),
      ])

      setDashboard(dashRes.data)
      setBills(billsRes.data)
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
      const res = await reportApi.exportCsv()
      const url = URL.createObjectURL(new Blob([res.data]))
      const a   = document.createElement('a')
      a.href    = url
      a.download = 'contas.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('Erro ao exportar CSV')
    }
  }

  async function handleExportPdf() {
    try {
      const res = await reportApi.exportPdf()
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const a   = document.createElement('a')
      a.href    = url
      a.download = 'contas.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('Erro ao exportar PDF')
    }
  }

  return {
    dashboard,
    bills,
    loading,
    error,
    handlePay,
    handleExportCsv,
    handleExportPdf,
  }
}