"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthProvider";
import { NAV_CONFIG } from "@/config/navConfig";
import Sidebar from "@/config/Sidebar";
import Navbar from "@/config/Navbar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  // wait until localStorage user loaded
  if (loading) return null;

  // not logged in -> go login
  if (!user) {
    router.push("/login");
    return null;
  }

  const role = user.role === "admin" ? "admin" : "user";
  const config = NAV_CONFIG[role];

  const onLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar items={config.sidebar} />

      <div style={{ flex: 1 }}>
        <Navbar
          user={user}
          showRedeemButton={config.navbar.showRedeemButton}
          onLogout={onLogout}
        />
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}