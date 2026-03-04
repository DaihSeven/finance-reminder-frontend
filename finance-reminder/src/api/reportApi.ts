import api from './axios'
import type { Summary, Dashboard, MonthlyHistory } from '@/types'

export const reportApi = {
  getSummary: () =>
    api.get<Summary>('/reports/summary'),

  getDashboard: () =>
    api.get<Dashboard>('/reports/dashboard'),

  getHistory: () =>
    api.get<MonthlyHistory[]>('/reports/history'),

  exportCsv: () =>
    api.get('/reports/export/csv', { responseType: 'blob' }),

  exportPdf: () =>
    api.get('/reports/export/pdf', { responseType: 'blob' }),

  emailCsv: () =>
    api.post('/reports/export/csv/email'),

  emailPdf: () =>
    api.post('/reports/export/pdf/email'),
}