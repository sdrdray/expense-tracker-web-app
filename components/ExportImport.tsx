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
    } catch {
      toast.error('Failed to import data. Please check your data.')
    }
  }

  const isValidImportData = (data: unknown): data is {
    transactions: Transaction[]
    budget: Budget
    recurringTransactions: RecurringTransaction[]
  } => {
    if (typeof data !== 'object' || data === null) return false;
    const typedData = data as Record<string, unknown>;
    return (
      'transactions' in typedData &&
      'budget' in typedData &&
      'recurringTransactions' in typedData &&
      Array.isArray(typedData.transactions) &&
      typedData.transactions.every(isValidTransaction) &&
      isValidBudget(typedData.budget) &&
      Array.isArray(typedData.recurringTransactions) &&
      typedData.recurringTransactions.every(isValidRecurringTransaction)
    )
  }

  const isValidTransaction = (transaction: unknown): transaction is Transaction => {
    return (
      typeof transaction === 'object' &&
      transaction !== null &&
      'id' in transaction &&
      'date' in transaction &&
      'description' in transaction &&
      'amount' in transaction &&
      'category' in transaction &&
      'type' in transaction &&
      typeof (transaction as Transaction).id === 'string' &&
      typeof (transaction as Transaction).date === 'string' &&
      typeof (transaction as Transaction).description === 'string' &&
      typeof (transaction as Transaction).amount === 'number' &&
      typeof (transaction as Transaction).category === 'string' &&
      ((transaction as Transaction).type === 'income' || (transaction as Transaction).type === 'expense')
    )
  }

  const isValidBudget = (budget: unknown): budget is Budget => {
    return (
      typeof budget === 'object' &&
      budget !== null &&
      'amount' in budget &&
      'period' in budget &&
      typeof (budget as Budget).amount === 'number' &&
      ((budget as Budget).period === 'monthly' || (budget as Budget).period === 'yearly')
    )
  }

  const isValidRecurringTransaction = (transaction: unknown): transaction is RecurringTransaction => {
    return (
      typeof transaction === 'object' &&
      transaction !== null &&
      'id' in transaction &&
      'description' in transaction &&
      'amount' in transaction &&
      'category' in transaction &&
      'type' in transaction &&
      'frequency' in transaction &&
      'startDate' in transaction &&
      typeof (transaction as RecurringTransaction).id === 'string' &&
      typeof (transaction as RecurringTransaction).description === 'string' &&
      typeof (transaction as RecurringTransaction).amount === 'number' &&
      typeof (transaction as RecurringTransaction).category === 'string' &&
      ((transaction as RecurringTransaction).type === 'income' || (transaction as RecurringTransaction).type === 'expense') &&
      (['daily', 'weekly', 'monthly', 'yearly'].includes((transaction as RecurringTransaction).frequency)) &&
      typeof (transaction as RecurringTransaction).startDate === 'string' &&
      ((transaction as RecurringTransaction).endDate === undefined || typeof (transaction as RecurringTransaction).endDate === 'string')
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

