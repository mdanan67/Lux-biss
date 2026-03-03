"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function UserSidebar({ open, onClose }) {
  const router = useRouter();
  const pathname = usePathname();

  const go = (href) => {
    router.push(href);
    onClose?.(); // close sidebar on mobile after click
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          fixed left-0 top-0 z-[60] w-72 bg-white border-r
          h-dvh
          transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0 md:sticky md:top-0 md:h-dvh md:z-auto
        `}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 px-5 py-4 border-b">
            <div className="h-9 w-9 rounded-xl bg-sky-500/15 flex items-center justify-center">
              <div className="h-5 w-5 rounded-md bg-sky-500" />
            </div>

            <div className="font-semibold text-lg">Luxbiss</div>

            {/* Close (mobile) */}
            <button
              onClick={onClose}
              className="ml-auto md:hidden h-9 w-9 rounded-lg hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center text-xl"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-2 overflow-y-auto">
            <NavItem
              label="Dashboard"
              icon={<IconDashboard />}
              active={pathname === "/dashboard"}
              onClick={() => go("/dashboard")}
            />

            <NavItem
              label="Products"
              icon={<IconBag />}
              active={pathname === "/product"}
              onClick={() => go("/product")}
            />

            <NavItem
              label="Wallet Management"
              icon={<IconWallet />}
              active={pathname === "/wallet"}
              onClick={() => go("/wallet")}
            />
          </nav>

          {/* Footer */}
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">
                  Jacinda Lynch
                </div>
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

function NavItem({ label, active, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3
        h-12 px-4 rounded-xl
        text-sm font-semibold
        transition-all duration-200
        ${
          active
            ? "bg-sky-500 text-white shadow-sm"
            : "text-slate-700 hover:bg-slate-100"
        }
      `}
    >
      <span
        className={`
          inline-flex h-6 w-6 items-center justify-center
          ${active ? "text-white" : "text-slate-500"}
        `}
      >
        {icon}
      </span>

      <span className="truncate">{label}</span>
    </button>
  );
}

/* Icons */
function BaseIcon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function IconDashboard() {
  return (
    <BaseIcon>
      <path d="M4 4h7v7H4z" />
      <path d="M13 4h7v7h-7z" />
      <path d="M4 13h7v7H4z" />
      <path d="M13 13h7v7h-7z" />
    </BaseIcon>
  );
}

function IconBag() {
  return (
    <BaseIcon>
      <path d="M6 7h12l-1 14H7L6 7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </BaseIcon>
  );
}

function IconWallet() {
  return (
    <BaseIcon>
      <path d="M4 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
      <path d="M4 7V6a2 2 0 0 1 2-2h12" />
      <path d="M16 13h3" />
    </BaseIcon>
  );
}