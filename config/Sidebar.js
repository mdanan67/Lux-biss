"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Plus } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ items, footerUser, open, setOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Dark overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static z-50 top-0 left-0 h-screen w-[260px] bg-white border-r",
          "transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center gap-3 px-4 border-b md:border-b-0">

          {/* Close button (mobile only) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden h-9 w-9 rounded-xl border bg-white grid place-items-center text-slate-700 hover:bg-slate-50 transition"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo (desktop only) */}
          <div className="hidden md:flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-sky-50 grid place-items-center">
              <Plus className="h-5 w-5 text-sky-500" />
            </div>
            <div className="text-[16px] font-semibold text-slate-900">
              Luxbiss
            </div>
          </div>

        </div>

        {/* Navigation */}
        <nav className="px-3 pt-3">
          <div className="flex flex-col gap-1">
            {items.map((it) => {
              const active = pathname === it.href;
              const Icon = it.icon;

              return (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] transition",
                    active
                      ? "bg-sky-50 text-sky-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-4 w-4",
                          active ? "text-sky-500" : "text-slate-400"
                        )}
                      />
                    )}
                    <span className="truncate">{it.label}</span>
                  </div>

                  {/* Optional badge */}
                  {typeof it.badge !== "undefined" && it.badge !== null && (
                    <span className="min-w-5 h-5 px-1 rounded-full bg-rose-500 text-white text-[11px] grid place-items-center">
                      {it.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer user card */}
        {footerUser && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="rounded-2xl bg-slate-50 border p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200" />

                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-slate-900 truncate">
                    {footerUser.name || "User"}
                  </div>

                  <div className="text-[11px] text-slate-500 truncate">
                    {footerUser.email || ""}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}