import { Bar, BarChart as ReBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesChartProps {
  darkMode: boolean;
  data: Array<{ month: string; revenue: number; expenses: number }>;
}

export function SalesChart({ darkMode, data }: SalesChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={darkMode ? "#374151" : "#e5e7eb"}
        />
        <XAxis
            dataKey="month"
            tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
            stroke={darkMode ? "#4b5563" : "#d1d5db"}
        />
        <YAxis
            tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
            stroke={darkMode ? "#4b5563" : "#d1d5db"}
            tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip
            contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#fff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            borderRadius: '8px'
            }}
        />
        <Legend 
            wrapperStyle={{ paddingTop: 20 }}
            formatter={(value) => (
            <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                {value}
            </span>
            )}
        />
        <Bar
            dataKey="revenue"
            name="Revenue"
            fill={darkMode ? "#4f46e5" : "#6366f1"}
            radius={[4, 4, 0, 0]}
        />
        <Bar
            dataKey="expenses"
            name="Expenses"
            fill={darkMode ? "#7c3aed" : "#8b5cf6"}
            radius={[4, 4, 0, 0]}
        />
      </ReBarChart>
    </ResponsiveContainer>
  );
}