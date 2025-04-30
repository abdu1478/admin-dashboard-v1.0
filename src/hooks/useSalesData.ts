import { staticSalesData } from "@/data/SalesData";
import { useState, useEffect } from 'react';

interface SalesData {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded';
  region: string;
  productCategory: string;
}

interface SalesMetrics {
  totalRevenue: number;
  transactionCount: number;
  averageOrderValue: number;
  revenueTrend: number;
  transactionTrend: number;
  productCategoryPerformance: Record<string, number>;
  revenueTrendData: Array<{ month: string; revenue: number }>;
}

interface UseSalesDataResult {
  sales: SalesData[];
  metrics: SalesMetrics | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

// Enhanced static metrics
const staticMetrics: SalesMetrics = {
  totalRevenue: staticSalesData.reduce((sum, item) => sum + item.amount, 0),
  transactionCount: staticSalesData.length,
  averageOrderValue: staticSalesData.reduce((sum, item) => sum + item.amount, 0) / staticSalesData.length,
  revenueTrend: 12.5, // Example percentage
  transactionTrend: 8.2, // Example percentage
  productCategoryPerformance: staticSalesData.reduce((acc, item) => {
    acc[item.productCategory] = (acc[item.productCategory] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>),
  revenueTrendData: [
    { month: 'Jan', revenue: 95000 },
    { month: 'Feb', revenue: 75000 },
    { month: 'Mar', revenue: 82000 },
  ]
};

export function useSalesData(): UseSalesDataResult {
  const [sales, setSales] = useState<SalesData[]>([]);
  const [metrics, setMetrics] = useState<SalesMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        // Simulate random error (10% chance)
        if (Math.random() < 0.1) {
          throw new Error('Simulated network error');
        }

        setSales(staticSalesData);
        setMetrics(staticMetrics);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }, 1000); // 1 second delay

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [refreshCount]);

  const refresh = () => {
    setIsLoading(true);
    setRefreshCount(prev => prev + 1);
  };

  return { sales, metrics, isLoading, error, refresh };
}