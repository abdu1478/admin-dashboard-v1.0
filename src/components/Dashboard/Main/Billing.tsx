import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import axios from "axios";

interface Invoice {
  id: number;
  customer: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue" | "Pending";
}

interface Props {
  darkMode: boolean;
}


const revenueData = [
  { date: '2025-04-01', revenue: 500 },
  { date: '2025-04-02', revenue: 700 },
  { date: '2025-04-03', revenue: 650 },
  { date: '2025-04-04', revenue: 900 },
  { date: '2025-04-05', revenue: 400 }
];

export default function Billing({ darkMode }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const {data: invoices} = await axios.get("http://localhost:5000/api/invoices");

        if(!invoices) {
          console.error("No invoices found");
        }
        console.log(invoices)
        setInvoices(prev => {
        // Build a quick lookup of existing IDs
        const existingIds = new Set(prev.map(inv => inv.customer));

        // Filter out any incoming invoice whose `customer` is already in state
        const onlyNew = invoices.filter((inv: any) => !existingIds.has(inv.customer));

        return [...prev, ...onlyNew];
      });

      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    }
    fetchInvoices()
  }, [])

  const filtered = invoices?.filter(inv => {
    const matchesSearch = inv.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  

  const totalDue = filtered.reduce((sum, inv) => inv.status !== 'Paid' ? sum + inv.amount : sum, 0);
  const totalRevenue = filtered.reduce((sum, inv) => inv.status === 'Paid' ? sum + inv.amount : sum, 0);
  const overdueCount = filtered.filter(inv => inv.status === 'Overdue').length;

  return (
    <div className={`animate-fade-in ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} p-6 space-y-6`}>      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <CardHeader>
            <CardTitle>Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">${totalDue}</div>
          </CardContent>
        </Card>
        <Card className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">${totalRevenue}</div>
          </CardContent>
        </Card>
        <Card className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <CardHeader>
            <CardTitle>Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{overdueCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-1 gap-2">
          <Input
            placeholder="Search customer..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Select onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Unpaid">Unpaid</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">New Invoice</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
              <DialogDescription>Fill in invoice details below.</DialogDescription>
            </DialogHeader>
            {/* Form fields here */}
            <DialogFooter>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Invoice Table */}
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(inv => (
              <TableRow key={inv.id}>
                <TableCell>{inv.id}</TableCell>
                <TableCell>{inv.customer}</TableCell>
                <TableCell>{new Date(inv.issueDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(inv.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>${inv.amount}</TableCell>
                <TableCell>
                  <Badge
                    className="w-16 text-center text-white"
                    colorVariant={inv.status} 
                  >
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="link" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Revenue Trend Chart */}
      <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md`}>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid 
              stroke={darkMode ? "#374151" : "#e5e7eb"}
              strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ 
                fill: darkMode ? "#f3f4f6" : "#1f2937" }} 
                className="mt-4"
              />
              <YAxis 
              className="ml-4"
                tick={{ 
                fill: darkMode ? "#f3f4f6" : "#1f2937" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1f2937" : "#f9fafb", 
                  borderColor: darkMode ? "#93c5fd" : "#60a5fa", 
                  borderRadius: 8,
                  color: darkMode ? "#fff" : "#111827",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue"
                stroke="#818cf8" // indigo-400
                strokeWidth={2}
                dot={{ fill: "#10b981" }} // emerald-500
                activeDot={{
                  fill: "#60a5fa", // blue-400
                  stroke: "#1f2937", // gray-800
                  strokeWidth: 2,
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        <Button disabled variant="outline">Prev</Button>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  );
}
