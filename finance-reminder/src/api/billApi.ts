import api from './axios'
import type { Bill, CreateBillDTO, BillFilters } from '@/types'

export const billApi = {
  getAll: () =>
    api.get<Bill[]>('/bills'),

  create: (data: CreateBillDTO) =>
    api.post<Bill>('/bills', data),

  pay: (id: string) =>
    api.patch<Bill>(`/bills/${id}/pay`),

  delete: (id: string) =>
    api.delete(`/bills/${id}`),

  getByFilters: (filters: BillFilters) =>
    api.get<Bill[]>('/bills/filters', { params: filters }),
}