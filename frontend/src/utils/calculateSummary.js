const calculateSummary = (expenses) => {
  const income = expenses
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = expenses
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income - expense;

  return {
    income,
    expense,
    balance,
  };
};

export default calculateSummary;
