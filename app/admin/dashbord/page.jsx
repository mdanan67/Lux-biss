"use client";

import AdmimNavbar from "@/componont/AdmimNavbar/AdmimNavbar";
import AdminSidebar from "@/componont/AdminSidebar/AdminSidebar";
import React, { useState } from "react";


export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      
      <AdmimNavbar onMenuClick={() => setSidebarOpen(true)} />

      
      <div className="flex">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}