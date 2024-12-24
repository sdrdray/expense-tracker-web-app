import { useState } from 'react'
import { Budget } from '../app/types'
import toast from 'react-hot-toast'

type Props = {
  budget: Budget
  setBudget: (budget: Budget) => void
}

export default function BudgetSetting({ budget, setBudget }: Props) {
  const [amount, setAmount] = useState(budget.amount.toString())
  const [period, setPeriod] = useState(budget.period)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newBudget: Budget = {
      amount: parseFloat(amount),
      period: period as 'monthly' | 'yearly'
    }
    setBudget(newBudget)
    toast.success('Budget updated successfully')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Set Budget</h2>
      <div className="flex flex-col sm:flex-row sm:items-center mb-2">
        <label className="mb-1 sm:mb-0 sm:mr-2">Amount:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          className="w-full sm:w-auto p-2 border rounded text-gray-900"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center mb-2">
        <label className="mb-1 sm:mb-0 sm:mr-2">Period:</label>
        <select 
          value={period} 
          onChange={(e) => setPeriod(e.target.value as 'monthly' | 'yearly')}
          className="w-full sm:w-auto p-2 border rounded text-gray-900"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Set Budget
      </button>
    </form>
  )
}
