# 💰 Expense Tracker Web App

A comprehensive, feature-rich expense tracking application built with Next.js, React, and TypeScript. Take control of your finances with powerful tools and intuitive interfaces!

## 📚 Table of Contents

- [Features](#-features)
- [Detailed Feature Breakdown](#-detailed-feature-breakdown)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Tech Stack](#-tech-stack)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

## ✨ Features

- 📊 **Intuitive Dashboard**: Get a quick overview of your financial status.
- 💸 **Transaction Management**: Add, edit, and delete income and expense transactions.
- 🔄 **Recurring Transactions**: Set up and manage recurring income or expenses.
- 📅 **Budgeting**: Set monthly or yearly budgets and track your progress.
- 📈 **Visual Reports**: View your spending habits with interactive charts.
- 🌓 **Dark Mode**: Easy on the eyes, day or night.
- 💾 **Data Export/Import**: Backup and restore your financial data with ease.
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices.
- 🔍 **Search and Filter**: Quickly find the transactions you're looking for.
- 🏷 **Categorization**: Organize your transactions with customizable categories.
- 📅 **Date Range Analysis**: Analyze your spending over custom date ranges.
- 🔔 **Budget Alerts**: Get notified when you're approaching your budget limits.
- 🔒 **Data Persistence**: Your data is saved locally, ensuring privacy and quick access.

## 🔍 Detailed Feature Breakdown

### 📊 Dashboard

The dashboard provides a comprehensive overview of your financial status:

- **Total Balance**: See your current balance at a glance.
- **Income vs Expenses**: Visual comparison of your income and expenses.
- **Recent Transactions**: Quick access to your latest financial activities.
- **Budget Progress**: Track how close you are to reaching your budget limits.
- **Spending by Category**: Pie chart showing your expense distribution.

### 💸 Transaction Management

Effortlessly manage your financial transactions:

- **Add Transactions**: Quickly add new income or expenses with detailed information.
- **Edit Transactions**: Update transaction details as needed.
- **Delete Transactions**: Remove unwanted or erroneous entries.
- **Bulk Actions**: Perform actions on multiple transactions at once.
- **Transaction History**: View a complete list of all your past transactions.

### 🔄 Recurring Transactions

Save time by setting up recurring transactions:

- **Flexible Recurrence**: Set transactions to repeat daily, weekly, monthly, or yearly.
- **Start and End Dates**: Define when a recurring transaction should begin and optionally when it should end.
- **Automatic Application**: Recurring transactions are automatically added on their due dates.
- **Easy Management**: Edit or delete recurring transactions at any time.

### 📅 Budgeting

Take control of your spending with powerful budgeting tools:

- **Monthly/Yearly Budgets**: Set overall budgets for different time periods.
- **Category-specific Budgets**: Allocate budgets to specific spending categories.
- **Budget Tracking**: See how much of your budget you've used in real-time.
- **Overspending Alerts**: Get warnings when you exceed your budget limits.

### 📈 Visual Reports

Gain insights into your financial habits with interactive charts:

- **Expense Distribution**: Pie chart showing spending by category.
- **Income vs Expenses**: Bar chart comparing income and expenses over time.
- **Trend Analysis**: Line chart displaying balance trends over time.
- **Category-specific Charts**: Analyze spending patterns for individual categories.

### 🌓 Dark Mode

Protect your eyes and save battery with a beautiful dark mode:

- **System Preference**: Automatically matches your system's theme preference.
- **Manual Toggle**: Easily switch between light and dark modes.
- **Persistent Setting**: Your mode preference is saved for future sessions.

### 💾 Data Export/Import

Keep your data safe and portable:

- **Export to JSON**: Download all your financial data in a structured format.
- **Import from JSON**: Easily restore your data or migrate from other sources.
- **Selective Import**: Choose what data to import (transactions, budgets, etc.).
- **Data Validation**: Ensure imported data is correct and complete.

### 📱 Responsive Design

Access your financial data from any device:

- **Mobile-Friendly Interface**: Optimized layouts for smartphones and tablets.
- **Desktop Optimization**: Take advantage of larger screens for more detailed views.
- **Consistent Experience**: Enjoy the same features and functionality across all devices.

### 🔍 Search and Filter

Find the information you need quickly:

- **Full-Text Search**: Search through transaction descriptions and categories.
- **Date Range Filtering**: View transactions from specific time periods.
- **Category Filtering**: Focus on transactions from particular categories.
- **Advanced Filters**: Combine multiple criteria for precise results.

### 🏷 Categorization

Organize your finances with a flexible categorization system:

- **Default Categories**: Start with a set of common expense and income categories.
- **Custom Categories**: Create your own categories to match your unique needs.
- **Category Management**: Edit, merge, or delete categories as your needs change.
- **Auto-Categorization**: Intelligent suggestions for categorizing new transactions.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/expense-tracker-pro.git
   ```

2. Navigate to the project directory:
   ```
   cd expense-tracker-pro
   ```

3. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🖥 Usage Guide

1. **Dashboard**: Upon opening the app, you'll see the main dashboard with an overview of your finances.

2. **Adding Transactions**: 
   - Click the "Add Transaction" button.
   - Fill in the transaction details (date, amount, category, etc.).
   - Choose whether it's a one-time or recurring transaction.
   - Click "Save" to add the transaction.

3. **Managing Transactions**:
   - View your transactions in the "Transactions" tab.
   - Use the search bar or filters to find specific transactions.
   - Click on a transaction to edit or delete it.

4. **Setting Budgets**:
   - Navigate to the "Budgets" section.
   - Set your overall monthly or yearly budget.
   - Optionally, set budgets for specific categories.
   - Your budget progress will be visible on the dashboard and in reports.

5. **Recurring Transactions**:
   - In the "Recurring" section, view and manage your recurring transactions.
   - Add new recurring transactions by specifying the frequency and duration.

6. **Viewing Reports**:
   - Go to the "Reports" section to see visual representations of your financial data.
   - Use the date range selector to analyze specific periods.
   - Explore different chart types for various insights.

7. **Exporting/Importing Data**:
   - In the "Settings" section, find the Export/Import options.
   - To backup: Click "Export Data" and save the JSON file.
   - To restore: Click "Import Data" and select your backup JSON file.

8. **Customizing Categories**:
   - In the "Categories" section, view and manage your transaction categories.
   - Add new categories or edit existing ones to suit your needs.

9. **Changing Themes**:
   - Click the theme toggle button (usually a sun/moon icon) to switch between light and dark modes.

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/): React framework for production-grade applications.
- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript for improved developer experience.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
- [Chart.js](https://www.chartjs.org/): JavaScript charting library for data visualization.
- [React Hot Toast](https://react-hot-toast.com/): Lightweight notification library for React.
- [next-themes](https://github.com/pacocoursey/next-themes): Theme management for Next.js.

## 🤝 Contributing

We welcome contributions to Expense Tracker Pro! Here's how you can help:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Hot Toast Documentation](https://react-hot-toast.com/#docs)

---

Made with ❤️ by [sdrdrax](https://github.com/sdrdray)
