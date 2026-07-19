import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Electronics", value: 35 },
  { name: "Grocery", value: 25 },
  { name: "Furniture", value: 20 },
  { name: "Medical", value: 20 },
];

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#9333ea"];

function InventoryPieChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={90}
          innerRadius={45}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default InventoryPieChart;