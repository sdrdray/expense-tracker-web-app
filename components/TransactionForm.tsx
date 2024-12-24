import { useState } from 'react'
import { Transaction } from '../app/types'
import toast from 'react-hot-toast'

type Props = {
  addTransaction: (transaction: Transaction) => void
}

export default function TransactionForm({ addTransaction }: Props) {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('expense')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !description || !amount || !category) {
      toast.error('Please fill in all fields')
      return
    }
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date,
      description,
      amount: parseFloat(amount),
      category,
      type: type as 'income' | 'expense'
    }
    addTransaction(newTransaction)
    toast.success('Transaction added successfully')
    setDate('')
    setDescription('')
    setAmount('')
    setCategory('')
    setType('expense')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block">Date:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded text-gray-900"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Description:</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded text-gray-900"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Amount:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded text-gray-900"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Category:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded text-gray-900"
          required
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="block">Type:</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded text-gray-900"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Add Transaction
      </button>
    </form>
  )
}
