import { Pie, Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title
} from 'chart.js'
import { Transaction } from '../app/types'

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title
)

type Props = {
  transactions: Transaction[]
}

export default function Chart({ transactions }: Props) {
  if (transactions.length === 0) {
    return <div>No transactions to display</div>
  }

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  const pieData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  }

  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const date = new Date(t.date)
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`
      acc[monthYear] = (acc[monthYear] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  const barData = {
    labels: Object.keys(monthlyExpenses),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(monthlyExpenses),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Expense Distribution',
      },
    },
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Expenses',
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Month/Year',
        },
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'Amount',
        },
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">Financial Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-64 md:h-96">
          <Pie data={pieData} options={options} />
        </div>
        <div className="h-64 md:h-96">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  )
}
