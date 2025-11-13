"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Table from "@/components/Table";
import ExpenseForm from "@/components/ExpenseForm";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/api/expenses");
      setExpenses(res.data || []);
    } catch {
      setExpenses([
        { id: 1, date: "2025-10-01", category: "Food", description: "Lunch", amount: 250 },
      ]);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = async (data) => {
    if (editing) {
      await api.put(`/api/expenses/${editing.id}`, data);
      setEditing(null);
    } else {
      await api.post("/api/expenses", data);
    }
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/expenses/${id}`);
    fetchExpenses();
  };

  const columns = [
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    { key: "description", label: "Description" },
    { key: "amount", label: "Amount" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Expenses</h2>
      <ExpenseForm onSubmit={handleAdd} initialData={editing} />
      <Table data={expenses} columns={columns} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
