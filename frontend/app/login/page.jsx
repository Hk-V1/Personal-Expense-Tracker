"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useEffect } from "react";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/dashboard");
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/api/login", data); // placeholder
      localStorage.setItem("token", res.data.token || "dummy-token");
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));
      router.push("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white shadow p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} placeholder="Email" className="w-full border p-2 rounded" />
        <input {...register("password")} type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button className="w-full bg-blue-500 text-white rounded py-2">Login</button>
      </form>
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => router.push("/register")}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Register
        </span>
      </p>
    </div>
  );
}
