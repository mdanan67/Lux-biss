"use client"
import React, { useMemo, useState } from "react";


//sidebar menu
export function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          fixed left-0 top-0 z-50 h-dvh w-72 bg-white border-r
          transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:sticky md:top-0 md:z-auto
        `}
      >
        {/* ✅ IMPORTANT: use flex column so bottom card stays at bottom on PC + mobile */}
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 px-5 py-4 border-b">
            <div className="h-9 w-9 rounded-xl bg-sky-500/15 flex items-center justify-center">
              <div className="h-5 w-5 rounded-md bg-sky-500" />
            </div>
            <div className="font-semibold text-lg">Luxbiss</div>

            {/* optional close icon (mobile) */}
            <button
              onClick={onClose}
              className="ml-auto md:hidden h-9 w-9 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          <nav className="p-4 space-y-2">
            <NavItem active label="Dashboard" />
            <NavItem label="Products" />
            <NavItem label="Wallet Management" />
          </nav>

          {/* ✅ push footer to bottom */}
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">Jacinda Lynch</div>
                <div className="text-xs text-slate-500 truncate">
                  Personal Manager
                </div>
                <div className="mt-1 inline-flex items-center gap-2 rounded-lg bg-sky-500/10 px-2 py-1 text-xs text-sky-700">
                  @shanto_sah
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
function NavItem({ label, active }) {
  return (
    <button
      className={`
        w-full flex items-center gap-3
        h-11 px-4
        rounded-full
        text-sm font-medium
        transition-all duration-200
        ${
          active
            ? "bg-sky-500 text-white shadow-sm"
            : "text-slate-700 hover:bg-slate-100"
        }
      `}
    >
      {/* Indicator Dot */}
      <span
        className={`
          h-2.5 w-2.5 rounded-full transition-colors
          ${active ? "bg-white" : "bg-slate-300"}
        `}
      />

      <span className="truncate">{label}</span>
    </button>
  );
}

/** ---------------------------
 *  2) Topbar
 *  --------------------------- */
export function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="h-16 flex items-center justify-between px-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Menu (same look as image: no border, subtle hover) */}
          <button
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 active:bg-slate-200"
            aria-label="Open menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-slate-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Redeem button (visible from sm like your screenshot) */}
          <button className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 active:bg-sky-700">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 7h16v14H4z" />
              <path d="M16 3v8" />
              <path d="M8 3v8" />
              <path d="M4 11h16" />
            </svg>
            Redeem Gift card
          </button>

          {/* User block (no border, like image) */}
          <button className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-slate-100 active:bg-slate-200">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-slate-200" />
              {/* online dot */}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="hidden sm:block text-left leading-tight">
              <div className="text-sm font-semibold text-slate-800">
                Jay Hargudson
              </div>
              <div className="text-xs text-slate-500">shanto**02@gmail.com</div>
            </div>

            {/* dropdown chevron */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

/** ---------------------------
 *  3) Balance + Withdraw Report
 *  --------------------------- */


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


// ✅ Wallet Management Header + Summary Cards (responsive)
export function WalletManagementSummary() {
  const cards = [
    { title: "Total Deposit", value: "$75,500", tone: "sky", icon: <IconWallet /> },
    { title: "Total Withdraw", value: "$75,500", tone: "emerald", icon: <IconCheck /> },
    { title: "Current Balance", value: "$24,500", tone: "orange", icon: <IconCard /> },
    { title: "Pending Withdrawal", value: "$24,500", tone: "rose", icon: <IconClock /> },
    { title: "Hold Balance", value: "$24,500", tone: "sky2", icon: <IconHold /> },
  ];

  return (
    <section className="space-y-4">
      {/* Top row (title + breadcrumb + actions) */}
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-2xl font-bold text-slate-900">Wallet Management</div>
          <div className="mt-1 text-sm text-slate-500">
            <span className="text-rose-600">Dashboard</span>
            <span className="mx-2">›</span>
            <span>Wallet</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-10 rounded-xl border bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Withdra
          </button>
          <button className="h-10 rounded-xl bg-sky-500 px-4 text-sm font-semibold text-white hover:bg-sky-600 inline-flex items-center gap-2">
            <span className="text-lg leading-none">＋</span>
            Fund Deposit
          </button>
        </div>
      </div>

      {/* Cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <WalletStatCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  );
}

function WalletStatCard({ title, value, tone, icon }) {
  const toneStyles = {
    sky: { ring: "bg-sky-500/10", icon: "text-sky-600", bg: "bg-sky-100" },
    emerald: { ring: "bg-emerald-500/10", icon: "text-emerald-600", bg: "bg-emerald-100" },
    orange: { ring: "bg-orange-500/10", icon: "text-orange-600", bg: "bg-orange-100" },
    rose: { ring: "bg-rose-500/10", icon: "text-rose-600", bg: "bg-rose-100" },
    sky2: { ring: "bg-sky-500/10", icon: "text-sky-600", bg: "bg-sky-100" },
  }[tone];

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className={`h-11 w-11 rounded-full ${toneStyles.ring} flex items-center justify-center`}>
        <div className={`h-9 w-9 rounded-full ${toneStyles.bg} flex items-center justify-center ${toneStyles.icon}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-500">{title}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

/* simple icons */
function IconWallet() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      <path d="M3 9h18" />
      <path d="M16 14h3" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function IconCard() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16v10H4z" />
      <path d="M4 10h16" />
      <path d="M7 15h4" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 8v5l3 2" />
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </svg>
  );
}
function IconHold() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16v10H4z" />
      <path d="M8 12h8" />
    </svg>
  );
}
/** ---------------------------
 *  Parent Component (Attach all 5)
 *  --------------------------- */
export default function LuxbissDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="md:flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          <div className="px-4 md:px-6 py-5 space-y-4">
            <WalletManagementSummary/>
            <TransactionHistory />
          </div>
        </main>
      </div>
    </div>
  );
}