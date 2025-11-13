"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import SummaryCard from "@/components/SummaryCard";

export default function DashboardPage() {
  const [summary, setSummary] = useState({ totalExpense: 0, totalIncome: 0, balance: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/api/summary");
        setSummary(res.data || { totalExpense: 0, totalIncome: 0, balance: 0 });
      } catch {
        setSummary({ totalExpense: 2500, totalIncome: 5000, balance: 2500 }); // dummy data
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard title="Total Income" value={`₹${summary.totalIncome}`} />
        <SummaryCard title="Total Expenses" value={`₹${summary.totalExpense}`} />
        <SummaryCard title="Balance" value={`₹${summary.balance}`} />
      </div>

      <div className="flex gap-4 mt-6">
        <a href="/expenses" className="bg-blue-500 text-white px-4 py-2 rounded">Add Expense</a>
        <a href="/income" className="bg-green-500 text-white px-4 py-2 rounded">Add Income</a>
        <a href="/reports" className="bg-gray-500 text-white px-4 py-2 rounded">View Reports</a>
      </div>
    </div>
  );
}
