import { useState } from 'react'
import { Transaction } from '../app/types'
import toast from 'react-hot-toast'

type Props = {
  transactions: Transaction[]
  deleteTransaction: (id: string) => void
  updateTransaction: (transaction: Transaction) => void
}

export default function TransactionList({ transactions, deleteTransaction, updateTransaction }: Props) {
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const filteredTransactions = transactions.filter(t => 
    (filter ? t.category === filter : true) &&
    (search ? t.description.toLowerCase().includes(search.toLowerCase()) : true)
  )

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id)
  }

  const handleSave = (transaction: Transaction) => {
    updateTransaction(transaction)
    setEditingId(null)
    toast.success('Transaction updated successfully')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Transactions</h2>
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/2 p-2 border rounded text-gray-900"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions..."
          className="w-full sm:w-1/2 p-2 border rounded text-gray-900"
        />
      </div>
      <ul className="space-y-2">
        {filteredTransactions.map(transaction => (
          <li key={transaction.id} className="p-2 border rounded">
            {editingId === transaction.id ? (
              <TransactionEditForm 
                transaction={transaction} 
                onSave={handleSave} 
                onCancel={() => setEditingId(null)} 
              />
            ) : (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <div>{transaction.date} - {transaction.description}</div>
                  <div>{transaction.amount} ({transaction.category}) - {transaction.type}</div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <button onClick={() => handleEdit(transaction)} className="mr-2 text-blue-500">Edit</button>
                  <button onClick={() => {
                    deleteTransaction(transaction.id)
                    toast.success('Transaction deleted successfully')
                  }} className="text-red-500">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

type EditFormProps = {
  transaction: Transaction
  onSave: (transaction: Transaction) => void
  onCancel: () => void
}

function TransactionEditForm({ transaction, onSave, onCancel }: EditFormProps) {
  const [editedTransaction, setEditedTransaction] = useState(transaction)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditedTransaction({
      ...editedTransaction,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedTransaction)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input 
        type="date" 
        name="date" 
        value={editedTransaction.date} 
        onChange={handleChange}
        className="w-full p-2 border rounded text-gray-900"
      />
      <input 
        type="text" 
        name="description" 
        value={editedTransaction.description} 
        onChange={handleChange}
        className="w-full p-2 border rounded text-gray-900"
      />
      <input 
        type="number" 
        name="amount" 
        value={editedTransaction.amount} 
        onChange={handleChange}
        className="w-full p-2 border rounded text-gray-900"
      />
      <select 
        name="category" 
        value={editedTransaction.category} 
        onChange={handleChange}
        className="w-full p-2 border rounded text-gray-900"
      >
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>
      <select 
        name="type" 
        value={editedTransaction.type} 
        onChange={handleChange}
        className="w-full p-2 border rounded text-gray-900"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="p-2 bg-green-500 text-white rounded">Save</button>
        <button type="button" onClick={onCancel} className="p-2 bg-gray-500 text-white rounded">Cancel</button>
      </div>
    </form>
  )
}
