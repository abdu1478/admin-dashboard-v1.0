
interface SalesData {
    id: string;
    date: string;
    customer: string;
    amount: number;
    status: 'pending' | 'completed' | 'refunded';
    region: string;
    productCategory: string;
  }


const staticSalesData: SalesData[] = [
    {
      id: '1',
      date: '2024-03-01',
      customer: 'Customer A',
      amount: 1500,
      status: 'completed',
      region: 'North',
      productCategory: 'Electronics'
    },
    {
      id: '2',
      date: '2024-03-02',
      customer: 'Customer B',
      amount: 2300,
      status: 'pending',
      region: 'South',
      productCategory: 'Furniture'
    },
    {
      id: '3',
      date: '2024-03-03',
      customer: 'Customer C',
      amount: 4500,
      status: 'completed',
      region: 'East',
      productCategory: 'Appliances'
    }
  ];
  export { staticSalesData }