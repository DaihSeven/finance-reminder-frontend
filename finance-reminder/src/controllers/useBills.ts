import { useState, useEffect } from 'react'
import { billApi } from '@/api/billApi'
import type { Bill, CreateBillDTO, BillFilters } from '@/types'

export function useBillsController() {
  const [bills, setBills]       = useState<Bill[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [filters, setFilters]   = useState<BillFilters>({})
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    loadBills()
  }, [])

  async function loadBills() {
    try {
      setLoading(true)
      setError(null)
      const res = await billApi.getAll()
      setBills(res.data)
    } catch {
      setError('Erro ao carregar contas')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(data: CreateBillDTO) {
    try {
      setError(null)
      await billApi.create(data)
      await loadBills()
    } catch {
      setError('Erro ao criar conta')
    }
  }

  async function handlePay(id: string) {
    try {
      setError(null)
      await billApi.pay(id)
      await loadBills()
    } catch {
      setError('Erro ao pagar conta')
    }
  }

  async function handleDelete(id: string) {
    try {
      setError(null)
      await billApi.delete(id)
      await loadBills()
    } catch {
      setError('Erro ao deletar conta')
    }
  }

  async function handleFilter(newFilters: BillFilters) {
    try {
      setLoading(true)
      setError(null)
      setFilters(newFilters)
      setIsFiltering(true)
      const res = await billApi.getByFilters(newFilters)
      setBills(res.data)
    } catch {
      setError('Erro ao filtrar contas')
    } finally {
      setLoading(false)
    }
  }

  async function handleClearFilters() {
    setFilters({})
    setIsFiltering(false)
    await loadBills()
  }

  return {
    bills,
    loading,
    error,
    filters,
    isFiltering,
    handleCreate,
    handlePay,
    handleDelete,
    handleFilter,
    handleClearFilters,
  }
}