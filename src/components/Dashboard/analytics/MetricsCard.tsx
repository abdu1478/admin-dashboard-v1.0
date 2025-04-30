import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  darkMode: boolean;
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  className: string;
}

export function MetricCard({ darkMode, title, value, description, icon, className }: MetricCardProps) {
  return (
    <Card className={`${className} ${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} hover:shadow-md transition cursor-pointer`}>
      <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2">
        <CardTitle className="text-xs md:text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-xl md:text-2xl font-bold">{value}</div>
        <p className="text-xs md:text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}