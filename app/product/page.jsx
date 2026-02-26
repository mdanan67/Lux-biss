"use client"
import React, { useState } from "react";


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


export function LevelProgressBar() {
  return (
    <section className="rounded-2xl border bg-white px-4 py-3 md:px-6 md:py-4">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 md:gap-6 items-center">
        {/* left small progress */}
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <div className="text-xs text-slate-500">Your Level 01</div>

            <div className="mt-1 flex items-center gap-3">
              <div className="h-2 w-40 max-w-[170px] rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full w-[70%] rounded-full bg-sky-500" />
              </div>
              <div className="text-xs font-semibold text-sky-600">70%</div>
            </div>
          </div>
        </div>

        {/* vertical divider + text */}
        <div className="md:border-l md:pl-6 text-sm text-slate-600 leading-relaxed">
          After completing your current level, your next level will be unlocked
          automatically. As your level increases, your profits will also
          increase. Keep investing.
        </div>
      </div>
    </section>
  );
}
export function ProductShowcase() {
  return (
    <section className="rounded-2xl border bg-white p-4 md:p-6">
      <div className="text-sm font-semibold text-slate-700">
        All Products Level 01
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[120px_1fr_320px] gap-4 lg:gap-6">
        {/* left thumbnails */}
        <div className="flex lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible pb-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <button
              key={i}
              className={`shrink-0 h-20 w-20 rounded-lg border bg-white flex items-center justify-center hover:bg-slate-50 ${
                i === 0 ? "border-sky-400 ring-2 ring-sky-100" : ""
              }`}
            >
              <div className="h-12 w-12 rounded bg-slate-200" />
            </button>
          ))}
        </div>

        {/* center big preview */}
        <div className="rounded-xl bg-slate-100 border flex items-center justify-center min-h-[260px]">
          <div className="h-48 w-48 rounded-2xl bg-slate-300" />
        </div>

        {/* right details */}
        <div className="rounded-xl border bg-white p-4 md:p-5">
          <div className="text-lg font-bold text-slate-900 leading-snug">
            Blackview Airbuds 8 (Display Screen - Bluetooth 5.3) Black
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            <div className="text-amber-500">★★★★★</div>
            <div className="text-slate-400">(150 Reviews)</div>
            <div className="text-emerald-600 font-semibold ml-2">In Stock</div>
          </div>

          <div className="mt-3 text-xl font-bold text-slate-900">$192.00</div>

          <ul className="mt-3 text-xs text-slate-600 space-y-1 list-disc pl-4">
            <li>Bluetooth 5.3 Headphones</li>
            <li>Active noise reduction</li>
            <li>Touch control with microphone</li>
            <li>Up to 6.8 hours of listening time</li>
          </ul>

          <div className="my-4 border-t" />

          {/* colors */}
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-slate-700">Colours:</div>
            <div className="flex items-center gap-2">
              <button className="h-6 w-6 rounded-full bg-black ring-2 ring-white border" />
              <button className="h-6 w-6 rounded-full bg-rose-600 ring-2 ring-white border" />
              <button className="h-6 w-6 rounded-full bg-slate-200 ring-2 ring-white border" />
            </div>
          </div>

          {/* sizes */}
          <div className="mt-4 flex items-center gap-3">
            <div className="text-sm font-semibold text-slate-700">Size:</div>
            <div className="flex flex-wrap gap-2">
              {["X", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  className={`h-8 w-8 rounded-md border text-xs font-semibold ${
                    s === "M"
                      ? "bg-sky-500 text-white border-sky-500"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* quantity + invest */}
          <div className="mt-5 flex items-center gap-3">
            <div className="inline-flex items-center rounded-lg border overflow-hidden">
              <button className="h-9 w-9 hover:bg-slate-50">−</button>
              <div className="h-9 w-12 flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <button className="h-9 w-9 bg-sky-500 text-white hover:bg-sky-600">
                +
              </button>
            </div>

            <button className="flex-1 h-9 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600">
              Invest Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export function AllLevelGrid() {
  const levels = [
    { label: "Level-01", active: true, locked: false },
    { label: "Level-02", active: false, locked: true },
    { label: "Level-03", active: false, locked: false },
    { label: "Level-04", active: false, locked: true },
    { label: "Level-02", active: false, locked: true },
    { label: "Level-02", active: false, locked: true },
    { label: "Level-03", active: false, locked: false },
    { label: "Level-04", active: false, locked: true },
  ];

  return (
    <section className="rounded-2xl border bg-white p-4 md:p-6">
      <div className="text-sm font-semibold text-slate-700">All Level</div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {levels.map((l, idx) => (
          <button
            key={idx}
            className={`
              relative rounded-xl border px-4 py-10 text-center font-semibold
              ${l.active ? "bg-sky-50 border-sky-200 text-slate-900" : "bg-white text-slate-700"}
              hover:bg-slate-50
            `}
          >
            <span className="text-lg">{l.label}</span>

            {l.locked && (
              <span className="absolute top-3 right-3 text-slate-400">
                🔒
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
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
<LevelProgressBar />
<ProductShowcase />
<AllLevelGrid />
          </div>
        </main>
      </div>
    </div>
  );
}