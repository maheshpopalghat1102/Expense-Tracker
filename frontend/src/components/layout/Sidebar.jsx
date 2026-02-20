import { FaHome, FaChartPie, FaPlus } from "react-icons/fa";

const Sidebar = ({ onAddExpense }) => {
  return (
    <div className="w-64 bg-primary text-white min-h-screen p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-10">ExpenseTracker</h2>

      <nav className="space-y-6">
        <div className="flex items-center gap-3 bg-indigo-700 p-2 rounded-lg">
          <FaHome />
          Dashboard
        </div>

        <button
          type="button"
          disabled
          title="Coming soon"
          className="w-full text-left flex items-center gap-3 p-2 rounded-lg opacity-60 cursor-not-allowed"
        >
          <FaChartPie />
          Reports
        </button>

        <button
          type="button"
          onClick={onAddExpense}
          className="w-full text-left flex items-center gap-3 hover:bg-indigo-700 p-2 rounded-lg"
        >
          <FaPlus />
          Add Expense
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
