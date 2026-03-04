export interface User {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface Bill {
  id: string
  title: string
  amount: number
  dueDate: string
  status: 'PENDING' | 'PAID'
  category: 'FIXED' | 'VARIABLE'
  recurrence: 'NONE' | 'MONTHLY'
  notificationSent: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateBillDTO {
  title: string
  amount: number
  dueDate: string
  category?: 'FIXED' | 'VARIABLE'
  recurrence?: 'NONE' | 'MONTHLY'
}

export interface BillFilters {
  startDate?: string
  endDate?: string
  category?: 'FIXED' | 'VARIABLE'
  recurrence?: 'NONE' | 'MONTHLY'
  page?: number
  limit?: number
}

export interface Summary {
  total: number
  pending: number
  paid: number
}

export interface Dashboard {
  summary: {
    total: number
    pending: number
    paid: number
    totalPendingAmount: number
    totalPaidAmount: number
  }
  byCategory: {
    category: string
    count: number
    totalAmount: number
  }[]
  byStatus: {
    status: string
    count: number
    totalAmount: number
  }[]
}

export interface MonthlyHistory {
  month: string
  total: number
  paid: number
  pending: number
  totalAmount: number
  paidAmount: number
  pendingAmount: number
}

export interface AuthResponse {
  token: string
}