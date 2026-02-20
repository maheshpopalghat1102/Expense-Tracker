import ExpenseRow from "./ExpenseRow";

const ExpenseTable = ({ expenses, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <h3 className="font-semibold mb-4">Recent Transactions</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Date</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseRow
              key={expense._id}
              expense={expense}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
