"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import {
  Menu,
  Search,
  CalendarDays,
  Mail,
  Bell,
  ChevronDown,
  LogOut,
  User,
  MoreHorizontal,
} from "lucide-react";

export default function Navbar({
  title = "Dashboard",
  user,
  config,
  onLogout,

  // ✅ NEW: sidebar toggle from layout
  onToggleSidebar,

  onRedeem,
  onWithdraw,
  onFundDeposit,
  mailCount = 3,
  bellCount = 4,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const mobileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const mobileActions = useMemo(() => {
    const actions = [];

    if (config?.showRedeem) {
      actions.push({
        key: "redeem",
        label: "Redeem Gift card",
        onClick: onRedeem,
        kind: "primary",
      });
    }
    if (config?.showWithdraw) {
      actions.push({
        key: "withdraw",
        label: "Withdraw",
        onClick: onWithdraw,
        kind: "secondary",
      });
    }
    if (config?.showFundDeposit) {
      actions.push({
        key: "fund",
        label: "+ Fund Deposit",
        onClick: onFundDeposit,
        kind: "primary",
      });
    }

    if (config?.showSearch) actions.push({ key: "search", label: "Search", icon: Search });
    if (config?.showCalendar) actions.push({ key: "calendar", label: "Calendar", icon: CalendarDays });
    if (config?.showMail)
      actions.push({
        key: "mail",
        label: "Mail",
        icon: Mail,
        badge: mailCount ? String(mailCount) : undefined,
      });
    if (config?.showBell)
      actions.push({
        key: "bell",
        label: "Notifications",
        icon: Bell,
        badge: bellCount ? String(bellCount) : undefined,
      });

    if (config?.showFlag) actions.push({ key: "flag", label: "Language", flag: "🇺🇸" });

    return actions;
  }, [config, onRedeem, onWithdraw, onFundDeposit, mailCount, bellCount]);

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-3 sm:px-6">
      {/* LEFT: sidebar toggle + title */}
      <div className="flex items-center gap-2 min-w-0">
        {/* ✅ Toggle sidebar button (mobile only) */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden h-9 w-9 rounded-xl border bg-white grid place-items-center text-slate-700 hover:bg-slate-50 transition"
          aria-label="Toggle sidebar"
          type="button"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Title hidden on mobile (as you wanted) */}
        <div className="hidden sm:block text-[14px] font-semibold text-slate-900 truncate">
          {title}
        </div>
      </div>

      {/* RIGHT actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Desktop actions */}
        <div className="hidden sm:flex items-center gap-3">
          {config?.showRedeem && (
            <button
              onClick={onRedeem}
              className="h-9 rounded-xl bg-sky-500 px-4 text-[12px] font-semibold text-white hover:bg-sky-600 transition"
              type="button"
            >
              Redeem Gift card
            </button>
          )}

          {config?.showWithdraw && (
            <button
              onClick={onWithdraw}
              className="h-9 rounded-xl border bg-white px-4 text-[12px] font-semibold text-slate-700 hover:bg-slate-50 transition"
              type="button"
            >
              Withdraw
            </button>
          )}

          {config?.showFundDeposit && (
            <button
              onClick={onFundDeposit}
              className="h-9 rounded-xl bg-sky-500 px-4 text-[12px] font-semibold text-white hover:bg-sky-600 transition"
              type="button"
            >
              + Fund Deposit
            </button>
          )}

          {config?.showSearch && (
            <IconButton>
              <Search className="h-4 w-4" />
            </IconButton>
          )}

          {config?.showCalendar && (
            <IconButton>
              <CalendarDays className="h-4 w-4" />
            </IconButton>
          )}

          {config?.showMail && (
            <IconButton badge={mailCount ? String(mailCount) : undefined}>
              <Mail className="h-4 w-4" />
            </IconButton>
          )}

          {config?.showBell && (
            <IconButton badge={bellCount ? String(bellCount) : undefined}>
              <Bell className="h-4 w-4" />
            </IconButton>
          )}

          {config?.showFlag && (
            <div className="h-9 w-9 rounded-xl border bg-white grid place-items-center">
              <span className="text-[12px]">🇺🇸</span>
            </div>
          )}
        </div>

        {/* Mobile actions menu */}
        <div className="sm:hidden relative" ref={mobileRef}>
          <button
            onClick={() => setMobileMenuOpen((s) => !s)}
            className="h-9 w-9 rounded-xl border bg-white grid place-items-center text-slate-700 hover:bg-slate-50 transition"
            aria-label="Open actions"
            type="button"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>

          {mobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border bg-white shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b">
                <div className="text-[12px] font-semibold text-slate-900">Actions</div>
                <div className="text-[11px] text-slate-500">
                  {user?.name || "User"} • {user?.role || ""}
                </div>
              </div>

              <div className="p-2">
                {mobileActions.map((a) => {
                  if (a.kind === "primary") {
                    return (
                      <button
                        key={a.key}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          a.onClick?.();
                        }}
                        className="w-full mb-2 h-9 rounded-xl bg-sky-500 px-4 text-[12px] font-semibold text-white hover:bg-sky-600 transition"
                        type="button"
                      >
                        {a.label}
                      </button>
                    );
                  }

                  if (a.kind === "secondary") {
                    return (
                      <button
                        key={a.key}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          a.onClick?.();
                        }}
                        className="w-full mb-2 h-9 rounded-xl border bg-white px-4 text-[12px] font-semibold text-slate-700 hover:bg-slate-50 transition"
                        type="button"
                      >
                        {a.label}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={a.key}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-[12px] text-slate-700 hover:bg-slate-50"
                      type="button"
                    >
                      <div className="flex items-center gap-2">
                        {a.icon ? <a.icon className="h-4 w-4 text-slate-400" /> : null}
                        {a.flag ? <span className="text-[13px]">{a.flag}</span> : null}
                        <span>{a.label}</span>
                      </div>

                      {a.badge ? (
                        <span className="min-w-5 h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] grid place-items-center">
                          {a.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        {config?.showProfile && (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((s) => !s)}
              className="h-10 rounded-xl border bg-white pl-2 pr-3 flex items-center gap-2 hover:bg-slate-50 transition"
              type="button"
            >
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div className="hidden md:block text-left leading-tight">
                <div className="text-[12px] font-semibold text-slate-900">
                  {user?.name || "User"}
                </div>
                <div className="text-[11px] text-slate-500">{user?.role || ""}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border bg-white shadow-lg overflow-hidden z-50">
                <button
                  className="w-full px-4 py-3 text-left text-[12px] text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  onClick={() => setProfileOpen(false)}
                  type="button"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  View profile
                </button>

                <button
                  className="w-full px-4 py-3 text-left text-[12px] text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout?.();
                  }}
                  type="button"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function IconButton({ children, badge }) {
  return (
    <button
      className="relative h-9 w-9 rounded-xl border bg-white grid place-items-center text-slate-600 hover:bg-slate-50 transition"
      type="button"
    >
      {children}
      {badge && (
        <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-rose-500 text-white text-[10px] grid place-items-center">
          {badge}
        </span>
      )}
    </button>
  );
}