"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthProvider";
import { NAV_CONFIG } from "@/config/navConfig";
import Sidebar from "@/config/Sidebar";
import Navbar from "@/config/Navbar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push("/user/login");
  }, [loading, user, router]);

  // ✅ Close mobile sidebar when route changes (optional but nice UX)
  useEffect(() => {
    setSidebarOpen(false);
  }, [router]);

  if (loading) return null;
  if (!user) return null;

  const role = user.role === "admin" ? "admin" : "user";
  const config = NAV_CONFIG[role];

  const onLogout = () => {
    logout();
    router.push("/user/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        items={config.sidebar}
        footerUser={user}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* ✅ IMPORTANT: min-w-0 prevents children (tables) from pushing layout wider */}
      <div className="flex-1 min-w-0">
        {/* If you want navbar sticky, add: sticky top-0 z-30 */}
        <Navbar
          title="Dashboard"
          user={user}
          config={config.navbar}
          onLogout={onLogout}
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
        />

        {/* ✅ min-w-0 + responsive padding */}
        <main className="min-w-0 p-4 sm:p-5">
          {children}
        </main>
      </div>
    </div>
  );
}