export type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense'
}

export type Budget = {
  amount: number
  period: 'monthly' | 'yearly'
}

export type RecurringTransaction = {
  id: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense'
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  startDate: string
  endDate?: string
}
