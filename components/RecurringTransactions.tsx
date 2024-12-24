import { useState } from 'react'
import { RecurringTransaction, Transaction } from '../app/types'
import toast from 'react-hot-toast'

type Props = {
  recurringTransactions: RecurringTransaction[]
  setRecurringTransactions: React.Dispatch<React.SetStateAction<RecurringTransaction[]>>
  addTransaction: (transaction: Transaction) => void
}

export default function RecurringTransactions({ recurringTransactions, setRecurringTransactions, addTransaction }: Props) {
  const [newRecurring, setNewRecurring] = useState<RecurringTransaction>({
    id: '',
    description: '',
    amount: 0,
    category: '',
    type: 'expense',
    frequency: 'monthly',
    startDate: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const recurringWithId = { ...newRecurring, id: Date.now().toString() }
    setRecurringTransactions([...recurringTransactions, recurringWithId])
    setNewRecurring({
      id: '',
      description: '',
      amount: 0,
      category: '',
      type: 'expense',
      frequency: 'monthly',
      startDate: '',
    })
    toast.success('Recurring transaction added')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewRecurring({ ...newRecurring, [e.target.name]: e.target.value })
  }

  const applyRecurringTransactions = () => {
    const today = new Date()
    recurringTransactions.forEach(rt => {
      const startDate = new Date(rt.startDate)
      if (startDate <= today) {
        const transaction: Transaction = {
          id: Date.now().toString(),
          date: today.toISOString().split('T')[0],
          description: rt.description,
          amount: rt.amount,
          category: rt.category,
          type: rt.type,
        }
        addTransaction(transaction)
      }
    })
    toast.success('Recurring transactions applied')
  }

  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Recurring Transactions</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="description"
          value={newRecurring.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded text-gray-900"
          required
        />
        <input
          type="number"
          name="amount"
          value={newRecurring.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-2 mb-2 border rounded text-gray-900"
          required
        />
        <select
          name="category"
          value={newRecurring.category}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded text-gray-900"
          required
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
        <select
          name="type"
          value={newRecurring.type}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded text-gray-900"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select
          name="frequency"
          value={newRecurring.frequency}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded text-gray-900"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={newRecurring.startDate}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded text-gray-900"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Add Recurring Transaction
        </button>
      </form>
      <button onClick={applyRecurringTransactions} className="w-full p-2 bg-green-500 text-white rounded">
        Apply Recurring Transactions
      </button>
      <ul className="mt-4">
        {recurringTransactions.map(rt => (
          <li key={rt.id} className="mb-2 p-2 bg-white dark:bg-gray-600 rounded">
            <div>{rt.description} - ${rt.amount}</div>
            <div>{rt.category} ({rt.type}) - {rt.frequency}</div>
            <div>Starts: {rt.startDate}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
