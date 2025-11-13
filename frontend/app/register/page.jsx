"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await api.post("/api/register", data);
      alert("Registration successful!");
      router.push("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white shadow p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name")} placeholder="Name" className="w-full border p-2 rounded" />
        <input {...register("email")} placeholder="Email" className="w-full border p-2 rounded" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button className="w-full bg-green-500 text-white rounded py-2">Register</button>
      </form>
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <span
          onClick={() => router.push("/login")}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
}
