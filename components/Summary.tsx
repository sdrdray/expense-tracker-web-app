import { Transaction, Budget } from '../app/types'

type Props = {
  transactions: Transaction[]
  budget: Budget
}

export default function Summary({ transactions, budget }: Props) {
  // Helper function to safely parse numbers
  const safeAmount = (amount: any) => (typeof amount === 'number' ? amount : 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + safeAmount(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + safeAmount(t.amount), 0);

  const netIncome = totalIncome - totalExpenses;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const thisMonthExpenses = transactions
    .filter(
      t =>
        t.type === 'expense' &&
        new Date(t.date).getMonth() === currentMonth &&
        new Date(t.date).getFullYear() === currentYear
    )
    .reduce((sum, t) => sum + safeAmount(t.amount), 0);

  const budgetStatus =
    budget.period === 'monthly'
      ? budget.amount - thisMonthExpenses
      : budget.amount / 12 - thisMonthExpenses;

  return (
    <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-2 bg-green-200 dark:bg-green-800 rounded">
          <div className="font-semibold">Total Income:</div>
          <div>₹{totalIncome.toFixed(2)}</div>
        </div>
        <div className="p-2 bg-red-200 dark:bg-red-800 rounded">
          <div className="font-semibold">Total Expenses:</div>
          <div>₹{totalExpenses.toFixed(2)}</div>
        </div>
        <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded">
          <div className="font-semibold">Net Income:</div>
          <div>₹{netIncome.toFixed(2)}</div>
        </div>
      </div>
      <div className="mt-4 p-2 bg-yellow-200 dark:bg-yellow-800 rounded">
        <div className="font-semibold">Budget Status ({budget.period}):</div>
        <div>₹{budgetStatus.toFixed(2)}</div>
        <div className="font-semibold">This Month's Expenses:</div>
        <div>₹{thisMonthExpenses.toFixed(2)}</div>
      </div>
    </div>
  );
}
