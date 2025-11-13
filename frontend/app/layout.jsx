import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Personal Expense Tracker",
  description: "A simple and clean expense tracking app",
};

export default function RootLayout({ children }) {
  const isAuthPage =
    typeof window !== "undefined" &&
    (window.location.pathname === "/login" ||
      window.location.pathname === "/register");

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {!isAuthPage && <Navbar />}
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
