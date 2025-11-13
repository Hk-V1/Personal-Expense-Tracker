"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6699"];

export default function ReportsPage() {
  const [expenseData, setExpenseData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/api/reports");
        setExpenseData(res.data.expenseByCategory || []);
        setMonthlyData(res.data.monthlyExpenses || []);
      } catch {
        // Dummy fallback
        setExpenseData([
          { name: "Food", value: 1500 },
          { name: "Transport", value: 800 },
          { name: "Shopping", value: 1200 },
        ]);
        setMonthlyData([
          { month: "Jan", amount: 2000 },
          { month: "Feb", amount: 2500 },
          { month: "Mar", amount: 1800 },
        ]);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Reports</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-center font-medium mb-2">Expenses by Category</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="value"
              nameKey="name"
            >
              {expenseData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-center font-medium mb-2">Monthly Expenses</h3>
          <LineChart width={350} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
