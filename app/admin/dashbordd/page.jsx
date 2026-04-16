"use client";

import AdmimNavbar from "@/componont/Admin/AdmimNavbar/AdmimNavbar";
import AdminSidebar from "@/componont/Admin/AdminSidebar/AdminSidebar";
import RecentActivityTable from "@/componont/Admin/RecentActivityTable/RecentActivityTable";
import React, { useState ,useEffect} from "react";


export default function DashboardLayout({ children }) {

  const [activityData, setActivityData] = useState([]);
  useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("/api/recent-activity");
    const data = await res.json();

    setActivityData(data);
  };

  fetchData();
}, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      
      <AdmimNavbar onMenuClick={() => setSidebarOpen(true)} />

      
      <div className="flex">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <div className="p-4 md:p-6">
           
                
              {/* <RecentActivityTable rows={obj}></RecentActivityTable> */}
                

           </div>
          
          
        </main>
      </div>
    </div>
  );
}

const obj = [
  {
    id: "1",
    action: "Withdraw",
    amount: 50,
    invoiceNumber: "20260213k843jeu4",
    date: "02.13 08:34 AM",
    userStatus: "Active",
    email: "stephen05052sdf@gmail.com",
    country: "China",
    status: "Pending"
  },
  {
    id: "2",
    action: "Deposit",
    amount: 20,
    invoiceNumber: "20260212k843jeu4",
    date: "02.12 08:34 AM",
    userStatus: "Active",
    email: "stephen05052sdf@gmail.com",
    country: "Nepal",
    status: "Pending"
  }
];