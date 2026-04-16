"use client"
import RecentActivityTable from '@/componont/Admin/RecentActivityTable/RecentActivityTable'
import React from 'react'

const page = () => {
  const rows = [
  {
    id: 1,
    action: "Purchase",
    amount: 120.5,
    invoiceNumber: "INV-1001",
    date: "2025-03-10",
    userStatus: "Active",
    email: "john.doe@gmail.com",
    country: "United States",
    status: "Completed",
  },
  {
    id: 2,
    action: "Subscription",
    amount: 49.99,
    invoiceNumber: "INV-1002",
    date: "2025-03-09",
    userStatus: "Hold",
    email: "sarah.miller@yahoo.com",
    country: "Canada",
    status: "Pending",
  },
  {
    id: 3,
    action: "Refund",
    amount: 75.0,
    invoiceNumber: "INV-1003",
    date: "2025-03-08",
    userStatus: "Active",
    email: "alex.smith@gmail.com",
    country: "United Kingdom",
    status: "Failed",
  },
  {
    id: 4,
    action: "Purchase",
    amount: 199.99,
    invoiceNumber: "INV-1004",
    date: "2025-03-07",
    userStatus: "Ignored",
    email: "emma.watson@gmail.com",
    country: "Australia",
    status: "Completed",
  },
  {
    id: 5,
    action: "Upgrade Plan",
    amount: 89.0,
    invoiceNumber: "INV-1005",
    date: "2025-03-06",
    userStatus: "Active",
    email: "michael.brown@gmail.com",
    country: "Germany",
    status: "Pending",
  },
  {
    id: 6,
    action: "Purchase",
    amount: 35.25,
    invoiceNumber: "INV-1006",
    date: "2025-03-05",
    userStatus: "Hold",
    email: "olivia.jones@gmail.com",
    country: "France",
    status: "Completed",
  },
];
  return (
    <div>
      <RecentActivityTable
  title="Recent Activity"
  rows={rows}
  onRowClick={(row) => console.log("Clicked row:", row)}
/>
      </div>
  )
}

export default page