const SummaryCard = ({ title, amount, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-md transition">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className={`text-2xl font-bold ${color}`}>
        ₹ {amount}
      </h2>
    </div>
  );
};

export default SummaryCard;
