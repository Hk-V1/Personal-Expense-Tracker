"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Table from "@/components/Table";
import IncomeForm from "@/components/IncomeForm";

export default function IncomePage() {
  const [income, setIncome] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchIncome = async () => {
    try {
      const res = await api.get("/api/income");
      setIncome(res.data || []);
    } catch {
      setIncome([{ id: 1, date: "2025-10-05", source: "Freelancing", amount: 2000, description: "Project" }]);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const handleAdd = async (data) => {
    if (editing) {
      await api.put(`/api/income/${editing.id}`, data);
      setEditing(null);
    } else {
      await api.post("/api/income", data);
    }
    fetchIncome();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/income/${id}`);
    fetchIncome();
  };

  const columns = [
    { key: "date", label: "Date" },
    { key: "source", label: "Source" },
    { key: "description", label: "Description" },
    { key: "amount", label: "Amount" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Income</h2>
      <IncomeForm onSubmit={handleAdd} initialData={editing} />
      <Table data={income} columns={columns} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}
