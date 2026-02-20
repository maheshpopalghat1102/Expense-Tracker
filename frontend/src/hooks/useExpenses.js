import { useEffect, useState } from "react";
import api from "../api/axios";

const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const { data } = await api.get("/expenses");
      setExpenses(data);
      setError("");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to fetch expenses.";
      setError(message);
    }
  };

  // Fetch summary
  const fetchSummary = async () => {
    try {
      const { data } = await api.get("/expenses/summary");
      setSummary(data);
      setError("");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to fetch summary.";
      setError(message);
    }
  };

  // Add expense
  const addExpense = async (formData) => {
    try {
      await api.post("/expenses", formData);
      fetchExpenses();
      fetchSummary();
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.message || "Failed to add expense.";
      throw new Error(message);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
      fetchSummary();
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.message || "Failed to delete expense.";
      throw new Error(message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchExpenses();
      await fetchSummary();
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    expenses,
    summary,
    loading,
    error,
    addExpense,
    deleteExpense,
  };
};

export default useExpenses;
