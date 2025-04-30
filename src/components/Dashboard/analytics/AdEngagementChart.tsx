import { Bar, BarChart as ReBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AdEngagementChartProps {
  darkMode: boolean;
  data: Array<{ 
    week: string;
    facebook: number;
    instagram: number;
    twitter: number;
    googleAds: number;
  }>;
}

export function AdEngagementChart({ darkMode, data }: AdEngagementChartProps) {
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
            dataKey="week"
            tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
            stroke={darkMode ? "#4b5563" : "#d1d5db"}
        />
        <YAxis
            tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
            stroke={darkMode ? "#4b5563" : "#d1d5db"}
        />
        <Tooltip
            contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#fff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            borderRadius: '8px'
            }}
            formatter={(value, name) => [
            `${value} clicks`,
            `Platform: ${name}`
            ]}
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
            dataKey="facebook"
            name="Facebook"
            fill="#1877F2"
            radius={[4, 4, 0, 0]}
        />
        <Bar
            dataKey="instagram"
            name="Instagram"
            fill="url(#instagramGradient)"
            radius={[4, 4, 0, 0]}
        />
        <Bar
            dataKey="twitter"
            name="Twitter"
            fill="#1DA1F2"
            radius={[4, 4, 0, 0]}
        />
        <Bar
            dataKey="googleAds"
            name="Google Ads"
            fill="#0A66C2"
            radius={[4, 4, 0, 0]}
        />
        <defs>
            <linearGradient id="instagramGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEDA77" />
            <stop offset="25%" stopColor="#DD2A7B" />
            <stop offset="50%" stopColor="#8134AF" />
            <stop offset="100%" stopColor="#515BD4" />
            </linearGradient>
        </defs>
      </ReBarChart>
    </ResponsiveContainer>
  );
}