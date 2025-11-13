"use client";
import { useForm } from "react-hook-form";

export default function ExpenseForm({ onSubmit, initialData }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || { date: "", category: "", description: "", amount: "" },
  });

  const submit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      <input {...register("date")} type="date" className="w-full border p-2 rounded" />
      <input {...register("category")} placeholder="Category" className="w-full border p-2 rounded" />
      <input {...register("description")} placeholder="Description" className="w-full border p-2 rounded" />
      <input {...register("amount")} placeholder="Amount" type="number" className="w-full border p-2 rounded" />
      <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Save</button>
    </form>
  );
}
