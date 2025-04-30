import { DataTable } from '@/components/ui/DataTable';
import { useSalesData } from '@/hooks/useSalesData';
import { DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

interface Props {
  darkMode: boolean;
  sidebarOpen: boolean;
}

export function SalesData({darkMode, sidebarOpen}: Props) {
  const { sales, metrics, isLoading, error } = useSalesData();

  const columns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Amount', accessor: 'amount', isCurrency: true },
    { header: 'Status', accessor: 'status' },
    { header: 'Region', accessor: 'region' },
  ];

  if (isLoading) return <div>Loading sales data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`space-y-6 p-4 animate-fade-in`}>
      <h1 className="text-2xl font-bold">Sales Dashboard</h1>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 bg-accent p-4 rounded-lg`}>
        <div className={`p-4 bg-card rounded-lg ${darkMode ? "bg-gray-900" : "bg-[#f5f5f5] shadow-lg"} ${sidebarOpen ? "md:text-xl" : "md:text-base"}`}>
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">Total Revenue</h2>
          </div>
          <p className="text-2xl font-bold">${metrics?.totalRevenue?.toLocaleString()}</p>
        </div>

        <div className={`p-4 bg-card rounded-lg ${darkMode ? "bg-gray-900" : "bg-[#f5f5f5] shadow-lg"}` }>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">Transactions</h2>
          </div>
          <p className="text-2xl font-bold">{metrics?.transactionCount}</p>
        </div>

        <div className={`p-4 bg-card rounded-lg ${darkMode ? "bg-gray-900" : "bg-[#f5f5f5] shadow-lg"}` }>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">Avg. Order Value</h2>
          </div>
          <p className="text-2xl font-bold">${metrics?.averageOrderValue?.toFixed(2)}</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={sales}
        isLoading={isLoading}
        className={`p-4 rounded-lg overflow-x-hidden  ${darkMode ? "bg-gray-800" : ""}` }
      />

      {metrics?.productCategoryPerformance && (
        <div className={`p-4 bg-card rounded-lg ${darkMode ? "bg-gray-800" : ""}` }>
          <h2 className="text-xl font-bold mb-4">Category Performance</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(metrics.productCategoryPerformance).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span>{category}</span>
                <span>${amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}