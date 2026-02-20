import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#4f46e5", "#10b981", "#f43f5e", "#f59e0b"];

const ChartSection = ({ expenses }) => {
  const categoryData = [];

  const grouped = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  for (let key in grouped) {
    categoryData.push({ name: key, value: grouped[key] });
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-soft">
        <h3 className="font-semibold mb-4">Category Breakdown</h3>
        <PieChart width={300} height={250}>
          <Pie
            data={categoryData}
            dataKey="value"
            outerRadius={90}
          >
            {categoryData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-soft">
        <h3 className="font-semibold mb-4">Expenses Overview</h3>
        <BarChart width={350} height={250} data={categoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4f46e5" />
        </BarChart>
      </div>
    </div>
  );
};

export default ChartSection;
