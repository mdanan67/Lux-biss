"use client";

import React, { useState,useEffect } from "react";
import UserTopbar from "../UserNavbar/UserTopper";
import UserSidebar from "../AboutHeroSection/UserSidebar/UserSidebar";

export default function UserDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="md:flex">
        <UserSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">
          <UserTopbar onMenuClick={() => setSidebarOpen(true)} />

          <div className="px-4 md:px-6 py-5 space-y-4">{children}</div>
        </main>
      </div>
    </div>
  );
}