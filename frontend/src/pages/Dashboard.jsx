import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import SummaryCard from "../components/dashboard/SummaryCard";
import ChartSection from "../components/dashboard/ChartSection";
import ExpenseTable from "../components/dashboard/ExpenseTable";
import AddExpenseModal from "../components/dashboard/AddExpenseModal";
import useExpenses from "../hooks/useExpenses";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";

const Dashboard = () => {
  const { expenses, summary, loading, error, addExpense, deleteExpense } =
    useExpenses();

  const [showModal, setShowModal] = useState(false);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="flex min-h-screen">
      <Sidebar onAddExpense={() => setShowModal(true)} />

      <div className="flex-1 bg-gray-50">
        <Navbar />

        <div className="p-6 space-y-6">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          {/* Top Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Dashboard
            </h1>

            <Button onClick={() => setShowModal(true)}>
              + Add Expense
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard
              title="Total Income"
              amount={summary.income}
              color="text-income"
            />
            <SummaryCard
              title="Total Expense"
              amount={summary.expense}
              color="text-expense"
            />
            <SummaryCard
              title="Balance"
              amount={summary.balance}
              color="text-primary"
            />
          </div>

          {/* Charts */}
          <ChartSection expenses={expenses} />

          {/* Expense Table */}
          <ExpenseTable
            expenses={expenses}
            onDelete={deleteExpense}
          />
        </div>
      </div>

      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onSave={addExpense}
        />
      )}
    </div>
  );
};

export default Dashboard;
