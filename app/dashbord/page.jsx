"use client"
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import UserDashboardLayout from "@/componont/User/UserDashbordLayout/UserDashboardLayout";

/** ---------------------------
 *  3) Balance + Withdraw Report
 *  --------------------------- */
export function BalanceAndWithdraw() {
  const barData = useMemo(
    () => [
      { name: "Jan", value: 520 },
      { name: "Feb", value: 260 },
      { name: "Mar", value: 760 },
      { name: "Apr", value: 410 },
      { name: "May", value: 220 },
      { name: "Jun", value: 300 },
    ],
    []
  );

  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      {/* Left: Balance + stats */}
      <div className="xl:col-span-2 rounded-2xl border bg-white p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-700">
              Current Balance
            </div>
            <div className="mt-1 text-3xl font-bold text-sky-600">$20,125.00</div>
            <div className="text-xs text-slate-500 mt-1">
              Your Current Deposit Balance
            </div>
          </div>

          <select className="rounded-xl border px-3 py-2 text-sm bg-white">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <StatCard
            title="Total Deposit"
            value="$24,500"
            badge="-25%"
            badgeTone="bad"
          />
          <StatCard
            title="Total Withdrawal"
            value="$24,500"
            badge="-25%"
            badgeTone="bad"
          />
        </div>
      </div>

      {/* Right: Withdraw report */}
      <div className="rounded-2xl border bg-white p-4 md:p-5">
        <div className="text-sm font-semibold text-slate-700">Withdraw Report</div>
        <div className="mt-4 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value, badge, badgeTone }) {
  const tone =
    badgeTone === "good"
      ? "bg-emerald-500/10 text-emerald-700"
      : "bg-rose-500/10 text-rose-700";

  return (
    <div className="rounded-2xl border p-4 flex items-center justify-between">
      <div>
        <div className="text-xs text-slate-500">{title}</div>
        <div className="text-lg font-bold text-slate-800">{value}</div>
      </div>
      <div className={`rounded-lg px-2 py-1 text-xs font-semibold ${tone}`}>
        {badge}
      </div>
    </div>
  );
}

/** ---------------------------
 *  4) Yearly Earnings
 *  --------------------------- */
export function YearlyEarnings() {
  const areaData = useMemo(
    () => [
      { m: "Jan", v: 980 },
      { m: "Feb", v: 820 },
      { m: "Mar", v: 960 },
      { m: "Apr", v: 880 },
      { m: "May", v: 1020 },
      { m: "Jun", v: 1100 },
      { m: "Jul", v: 980 },
      { m: "Aug", v: 1260 },
      { m: "Sep", v: 900 },
      { m: "Oct", v: 760 },
      { m: "Nov", v: 940 },
      { m: "Dec", v: 880 },
    ],
    []
  );

  return (
    <section className="rounded-2xl border bg-white p-4 md:p-5">
      <div className="text-sm font-semibold text-slate-700">Yearly Earnings</div>
      <div className="text-xs text-slate-500">Revenue</div>

      <div className="mt-4 h-56 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={areaData} margin={{ left: 8, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="m" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="v" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

/** ---------------------------
 *  5) Transaction History
 *  --------------------------- */
export function TransactionHistory() {
  const rows = useMemo(
    () => [
      {
        id: "#302012",
        date: "1 min ago",
        amount: "$121.00",
        type: "Deposit",
        method: "USDT TRX Tron (TRC20)",
        status: "Processing",
      },
      {
        id: "#302011",
        date: "1 min ago",
        amount: "$590.00",
        type: "Withdraw",
        method: "BTC (Bitcoin)",
        status: "Processing",
      },
      {
        id: "#302002",
        date: "5 hour ago",
        amount: "$125.00",
        type: "Withdraw",
        method: "ETH Ethereum (ERC20)",
        status: "Completed",
      },
      {
        id: "#301901",
        date: "1 day ago",
        amount: "$348.00",
        type: "Withdraw",
        method: "USDT TRX Tron (TRC20)",
        status: "Completed",
      },
      {
        id: "#301900",
        date: "2 day ago",
        amount: "$607.00",
        type: "Withdraw",
        method: "LTC (Litecoin)",
        status: "Completed",
      },
    ],
    []
  );

  return (
    <section className="rounded-2xl border bg-white p-4 md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-700">
          Recent Transaction History
        </div>
        <button className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
          Filters
        </button>
      </div>

      {/* Responsive table wrapper */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[880px] w-full text-sm">
          <thead className="text-left text-slate-500 border-b">
            <tr>
              <th className="py-3 pr-4 w-10">
                <input type="checkbox" />
              </th>
              <th className="py-3 pr-4">Transaction ID</th>
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4">Amount</th>
              <th className="py-3 pr-4">Type</th>
              <th className="py-3 pr-4">Payment Method</th>
              <th className="py-3 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b last:border-b-0">
                <td className="py-3 pr-4">
                  <input type="checkbox" />
                </td>
                <td className="py-3 pr-4 text-sky-600 font-medium">{r.id}</td>
                <td className="py-3 pr-4 text-slate-600">{r.date}</td>
                <td className="py-3 pr-4 font-semibold text-slate-800">{r.amount}</td>
                <td className="py-3 pr-4 text-slate-700">{r.type}</td>
                <td className="py-3 pr-4 text-slate-600">{r.method}</td>
                <td className="py-3 pr-4">
                  <StatusPill status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusPill({ status }) {
  const isDone = status.toLowerCase() === "completed";
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        isDone
          ? "bg-emerald-500/10 text-emerald-700"
          : "bg-amber-500/10 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
}


export default function LuxbissDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <UserDashboardLayout>
      {/* <BalanceAndWithdraw />
      <YearlyEarnings />
      <TransactionHistory /> */}
    </UserDashboardLayout>
  );
}