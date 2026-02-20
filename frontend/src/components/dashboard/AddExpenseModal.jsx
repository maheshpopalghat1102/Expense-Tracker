import { useState } from "react";

const AddExpenseModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (error) setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { title, amount, category, type } = formData;
    if (!title || !amount || !category || !type) {
      setError("All fields are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save expense.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded-lg"
        />

        <select
          name="type"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-lg"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-rose-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AddExpenseModal;
