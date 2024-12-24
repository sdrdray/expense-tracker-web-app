"use client"

import { useState, useEffect } from 'react'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import Summary from '../components/Summary'
import Chart from '../components/Chart'
import ExportImport from '../components/ExportImport'
import BudgetSetting from '../components/BudgetSetting'
import RecurringTransactions from '../components/RecurringTransactions'
import { Transaction, Budget, RecurringTransaction } from './types'
import { Toaster } from 'react-hot-toast'
import { useTheme } from 'next-themes'

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budget, setBudget] = useState<Budget>({ amount: 0, period: 'monthly' })
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([])
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions')
    const savedBudget = localStorage.getItem('budget')
    const savedRecurringTransactions = localStorage.getItem('recurringTransactions')

    if (savedTransactions) setTransactions(JSON.parse(savedTransactions))
    if (savedBudget) setBudget(JSON.parse(savedBudget))
    if (savedRecurringTransactions) setRecurringTransactions(JSON.parse(savedRecurringTransactions))
  }, [])

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
    localStorage.setItem('budget', JSON.stringify(budget))
    localStorage.setItem('recurringTransactions', JSON.stringify(recurringTransactions))
  }, [transactions, budget, recurringTransactions])

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction])
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t))
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <button 
          onClick={toggleTheme}
          className="p-2 bg-gray-200 dark:bg-gray-600 rounded"
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <TransactionForm addTransaction={addTransaction} />
          <BudgetSetting budget={budget} setBudget={setBudget} />
          <Summary transactions={transactions} budget={budget} />
          <ExportImport 
            transactions={transactions} 
            setTransactions={setTransactions} 
            budget={budget}
            setBudget={setBudget}
            recurringTransactions={recurringTransactions}
            setRecurringTransactions={setRecurringTransactions}
          />
        </div>
        <div>
          <TransactionList 
            transactions={transactions} 
            deleteTransaction={deleteTransaction}
            updateTransaction={updateTransaction}
          />
          <RecurringTransactions
            recurringTransactions={recurringTransactions}
            setRecurringTransactions={setRecurringTransactions}
            addTransaction={addTransaction}
          />
        </div>
      </div>
      {transactions.length > 0 && <Chart transactions={transactions} />}
    </div>
  )
}
