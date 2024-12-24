import { useState } from 'react'
import { Transaction, Budget, RecurringTransaction } from '../app/types'
import toast from 'react-hot-toast'

type Props = {
  transactions: Transaction[]
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
  budget: Budget
  setBudget: React.Dispatch<React.SetStateAction<Budget>>
  recurringTransactions: RecurringTransaction[]
  setRecurringTransactions: React.Dispatch<React.SetStateAction<RecurringTransaction[]>>
}

export default function ExportImport({ 
  transactions, 
  setTransactions, 
  budget, 
  setBudget, 
  recurringTransactions, 
  setRecurringTransactions 
}: Props) {
  const [importData, setImportData] = useState('')

  const handleExport = () => {
    const dataToExport = {
      transactions,
      budget,
      recurringTransactions
    }
    const dataStr = JSON.stringify(dataToExport)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'expense_tracker_data.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    toast.success('Data exported successfully')
  }

  const handleImport = () => {
    try {
      const importedData = JSON.parse(importData)
      if (isValidImportData(importedData)) {
        setTransactions(importedData.transactions)
        setBudget(importedData.budget)
        setRecurringTransactions(importedData.recurringTransactions)
        toast.success('Data imported successfully')
      } else {
        throw new Error('Invalid data format')
      }
    } catch (error) {
      toast.error('Failed to import data. Please check your data.')
    }
  }

  const isValidImportData = (data: any): data is {
    transactions: Transaction[]
    budget: Budget
    recurringTransactions: RecurringTransaction[]
  } => {
    return (
      Array.isArray(data.transactions) &&
      data.transactions.every(isValidTransaction) &&
      isValidBudget(data.budget) &&
      Array.isArray(data.recurringTransactions) &&
      data.recurringTransactions.every(isValidRecurringTransaction)
    )
  }

  const isValidTransaction = (transaction: any): transaction is Transaction => {
    return (
      typeof transaction.id === 'string' &&
      typeof transaction.date === 'string' &&
      typeof transaction.description === 'string' &&
      typeof transaction.amount === 'number' &&
      typeof transaction.category === 'string' &&
      (transaction.type === 'income' || transaction.type === 'expense')
    )
  }

  const isValidBudget = (budget: any): budget is Budget => {
    return (
      typeof budget.amount === 'number' &&
      (budget.period === 'monthly' || budget.period === 'yearly')
    )
  }

  const isValidRecurringTransaction = (transaction: any): transaction is RecurringTransaction => {
    return (
      typeof transaction.id === 'string' &&
      typeof transaction.description === 'string' &&
      typeof transaction.amount === 'number' &&
      typeof transaction.category === 'string' &&
      (transaction.type === 'income' || transaction.type === 'expense') &&
      (transaction.frequency === 'daily' || transaction.frequency === 'weekly' || transaction.frequency === 'monthly' || transaction.frequency === 'yearly') &&
      typeof transaction.startDate === 'string' &&
      (transaction.endDate === undefined || typeof transaction.endDate === 'string')
    )
  }

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">Export/Import</h2>
      <button 
        onClick={handleExport}
        className="w-full p-2 bg-blue-500 text-white rounded mb-2"
      >
        Export Data
      </button>
      <textarea
        value={importData}
        onChange={(e) => setImportData(e.target.value)}
        placeholder="Paste your exported data here"
        className="w-full p-2 border rounded mb-2 text-gray-900"
        rows={4}
      />
      <button 
        onClick={handleImport}
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Import Data
      </button>
    </div>
  )
}
