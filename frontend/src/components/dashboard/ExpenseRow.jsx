import { FaTrash } from "react-icons/fa";

const ExpenseRow = ({ expense, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3">{expense.title}</td>
      <td className="p-3">{expense.category}</td>
      <td className="p-3">
        {new Date(expense.date).toLocaleDateString()}
      </td>
      <td
        className={`p-3 font-semibold ${
          expense.type === "income"
            ? "text-income"
            : "text-expense"
        }`}
      >
        ₹ {expense.amount}
      </td>
      <td className="p-3 flex gap-3">
        <FaTrash
          className="cursor-pointer text-rose-500"
          onClick={() => onDelete(expense._id)}
        />
      </td>
    </tr>
  );
};

export default ExpenseRow;
