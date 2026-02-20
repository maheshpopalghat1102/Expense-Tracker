import Expense from "../models/Expense.js";

/* ---------------- ADD EXPENSE ---------------- */
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;

    if (!title || !amount || !category || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      type,
      date: date || Date.now(),
    });

    res.status(201).json(expense);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ---------------- GET ALL EXPENSES ---------------- */
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id })
      .sort({ date: -1 });

    res.json(expenses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ---------------- UPDATE EXPENSE ---------------- */
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Check ownership
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedExpense);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ---------------- DELETE EXPENSE ---------------- */
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await expense.deleteOne();

    res.json({ message: "Expense removed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ---------------- GET SUMMARY ---------------- */
export const getSummary = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    const income = expenses
      .filter(item => item.type === "income")
      .reduce((acc, item) => acc + item.amount, 0);

    const expenseTotal = expenses
      .filter(item => item.type === "expense")
      .reduce((acc, item) => acc + item.amount, 0);

    const balance = income - expenseTotal;

    res.json({
      income,
      expense: expenseTotal,
      balance,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
