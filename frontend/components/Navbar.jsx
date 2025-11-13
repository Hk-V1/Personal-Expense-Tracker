"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <div className="flex gap-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/expenses" className="hover:underline">Expenses</Link>
        <Link href="/income" className="hover:underline">Income</Link>
        <Link href="/reports" className="hover:underline">Reports</Link>
      </div>
      <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:underline">
        <LogOut size={18} /> Logout
      </button>
    </nav>
  );
}
