"use client";
import React, { useEffect, useState } from "react";

/* ---------------------------
   Sidebar (unchanged)
---------------------------- */
export function Sidebar({ open, onClose }) {
  return (
    <>
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
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 px-5 py-4 border-b">
            <div className="h-9 w-9 rounded-xl bg-sky-500/15 flex items-center justify-center">
              <div className="h-5 w-5 rounded-md bg-sky-500" />
            </div>
            <div className="font-semibold text-lg">Luxbiss</div>

            <button
              onClick={onClose}
              className="ml-auto md:hidden h-9 w-9 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          <nav className="p-4 space-y-2">
            <NavItem label="Dashboard" />
            <NavItem label="Products" />
            <NavItem active label="Wallet Management" />
          </nav>

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

/* ---------------------------
   Topbar (unchanged)
---------------------------- */
export function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
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

        <div className="flex items-center gap-3">
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

          <button className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-slate-100 active:bg-slate-200">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-slate-200" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="hidden sm:block text-left leading-tight">
              <div className="text-sm font-semibold text-slate-800">
                Jay Hargudson
              </div>
              <div className="text-xs text-slate-500">shanto**02@gmail.com</div>
            </div>

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

/* ---------------------------
   Middle Profile
   ✅ ONLY FIX: make ALL 3 modals CENTERED
   - Removed rightTop alignment
   - Overlay now uses items-center justify-center
---------------------------- */
function ProfileMiddle() {
  const [profile, setProfile] = useState({
    header: {
      name: "Md. Shanto Miah",
      email: "shanto**02@gmail.com",
      status: "Active",
      avatarUrl: "",
    },
    personal: {
      fullName: "Md. Shanto Miah",
      dob: "25 August 1999",
      gender: "",
      email: "shanto****20@gmail.com",
      phone: "",
      address: "1/7, Ahamed Nagar, Mirpur-2, Dhaka-1216",
      country: "",
    },
    wallet: {
      networkKey: "USDT_TRX_TRON",
      paymentMethod: "Cryptocurrency",
      currency: "USDT TRX Tron",
      network: "TRC20",
      withdrawalAddress: "",
    },
    password: {
      registeredEmail: "ste*****26@gmail.com",
    },
  });

  const [personalOpen, setPersonalOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const handlePersonalSubmit = (draft) => {
    setProfile((p) => ({
      ...p,
      personal: draft,
      header: { ...p.header, name: draft.fullName || p.header.name },
    }));
    setPersonalOpen(false);
  };

  const handleWalletSubmit = (draft) => {
    setProfile((p) => ({ ...p, wallet: draft }));
    setWalletOpen(false);
  };

  const handleSendOtp = () => {
    setPasswordOpen(false);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      {/* Top card */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="px-6 py-10">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
              {profile.header.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.header.avatarUrl}
                  alt={profile.header.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-slate-700">
                  {getInitials(profile.header.name)}
                </span>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="text-sm font-semibold text-slate-900">
                {profile.header.name}
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {profile.header.status}
              </span>
            </div>

            <div className="mt-1 text-xs text-slate-500">
              {profile.header.email}
            </div>

            <button
              onClick={() => setPasswordOpen(true)}
              className="mt-4 h-9 rounded-md bg-[#148DB3] px-4 text-xs font-semibold text-white hover:opacity-95"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50">
          <div className="text-xs font-semibold text-slate-800">
            Personal Information
          </div>
          <button
            onClick={() => setPersonalOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#148DB3]"
          >
            <PencilMini />
            Edit Information
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="grid gap-y-6 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            <InfoMini label="Full Name" value={profile.personal.fullName || "-"} />
            <InfoMini label="Date of Birth" value={profile.personal.dob || "-"} />
            <InfoMini label="Gender" value={profile.personal.gender || "-"} />
            <InfoMini label="Email" value={profile.personal.email || "-"} />
            <InfoMini label="Phone" value={profile.personal.phone || "-"} />
            <InfoMini label="Address" value={profile.personal.address || "-"} />
            <InfoMini label="Country" value={profile.personal.country || "-"} />
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Payment Wallet information */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-50">
          <div className="text-xs font-semibold text-slate-800">
            Payment Wallet information
          </div>
          <button
            onClick={() => setWalletOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#148DB3]"
          >
            <PencilMini />
            Edit Information
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="grid gap-y-6 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            <InfoMini label="Payment Method" value={profile.wallet.paymentMethod || "-"} />
            <InfoMini label="Currency" value={profile.wallet.currency || "-"} />
            <InfoMini label="Network" value={profile.wallet.network || "-"} />
            <InfoMini
              label="Withdrawal Address"
              value={profile.wallet.withdrawalAddress || "-"}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <PersonalInfoModal
        open={personalOpen}
        initialValue={profile.personal}
        onClose={() => setPersonalOpen(false)}
        onSubmit={handlePersonalSubmit}
      />

      <WalletInfoModal
        open={walletOpen}
        initialValue={profile.wallet}
        onClose={() => setWalletOpen(false)}
        onSubmit={handleWalletSubmit}
      />

      <ChangePasswordModal
        open={passwordOpen}
        registeredEmail={profile.password.registeredEmail}
        onClose={() => setPasswordOpen(false)}
        onSendOtp={handleSendOtp}
      />
    </div>
  );
}

/* ---------------------------
   MODALS matching screenshots
---------------------------- */

function PersonalInfoModal({ open, initialValue, onClose, onSubmit }) {
  const [draft, setDraft] = useState(initialValue);

  useEffect(() => {
    if (open) setDraft(initialValue);
  }, [open, initialValue]);

  if (!open) return null;

  return (
    <Overlay>
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold text-slate-800">
            Add Personal Information
          </div>
          <IconClose onClick={onClose} />
        </div>

        <div className="px-6 pb-6">
          <Label>Full Name</Label>
          <Input
            placeholder="Enter Full name"
            value={draft.fullName}
            onChange={(e) =>
              setDraft((d) => ({ ...d, fullName: e.target.value }))
            }
          />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Date of Birth</Label>
              <InputWithLeftIcon
                icon={<CalendarIcon />}
                placeholder="Select date of birth"
                value={draft.dob}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, dob: e.target.value }))
                }
              />
            </div>

            <div>
              <Label>Gender</Label>
              <Select
                value={draft.gender}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, gender: e.target.value }))
                }
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Select>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Email Address</Label>
              <Input
                placeholder="Email"
                value={draft.email}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, email: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                placeholder="Enter Phone Number"
                value={draft.phone}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, phone: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Full Address</Label>
              <Input
                placeholder="Full Address"
                value={draft.address}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, address: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Country of Residence</Label>
              <Select
                value={draft.country}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, country: e.target.value }))
                }
              >
                <option value="" disabled>
                  Select Country
                </option>
                <option>Bangladesh</option>
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
              </Select>
            </div>
          </div>

          <button
            onClick={() => onSubmit(draft)}
            className="mt-6 w-full rounded-md bg-[#148DB3] py-3 text-xs font-bold tracking-wide text-white hover:opacity-95"
          >
            UPDATE INFORMATION
          </button>
        </div>
      </div>
    </Overlay>
  );
}

function ChangePasswordModal({ open, registeredEmail, onClose, onSendOtp }) {
  if (!open) return null;

  // ✅ FIX: centered now (no align="rightTop")
  return (
    <Overlay>
      <div className="w-full max-w-sm rounded-lg bg-white shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="text-sm font-semibold text-slate-800">
            Change Password
          </div>
          <IconClose onClick={onClose} />
        </div>

        <div className="px-5 pb-5">
          <p className="text-xs text-slate-500 leading-relaxed">
            For security reasons, password changes require email verification
          </p>

          <div className="mt-4">
            <Label>Registered Email</Label>
            <Input value={registeredEmail} disabled />
          </div>

          <button
            onClick={onSendOtp}
            className="mt-4 w-full rounded-md bg-[#148DB3] py-3 text-xs font-bold text-white hover:opacity-95"
          >
            Send OTP
          </button>
        </div>
      </div>
    </Overlay>
  );
}

function WalletInfoModal({ open, initialValue, onClose, onSubmit }) {
  const [draft, setDraft] = useState(initialValue);

  useEffect(() => {
    if (open) setDraft(initialValue);
  }, [open, initialValue]);

  if (!open) return null;

  const options = [
    {
      key: "USDT_TRX_TRON",
      title: "USDT TRX Tron",
      subtitle: "TRC20",
      iconBg: "bg-emerald-600",
      iconText: "T",
    },
    {
      key: "BTC",
      title: "BTC",
      subtitle: "Bitcoin",
      iconBg: "bg-orange-500",
      iconText: "₿",
    },
    {
      key: "LTC",
      title: "LTC",
      subtitle: "Litecoin",
      iconBg: "bg-blue-600",
      iconText: "Ł",
    },
    {
      key: "ETH",
      title: "ETH (Ethereum)",
      subtitle: "ERC20",
      iconBg: "bg-indigo-600",
      iconText: "◇",
    },
  ];

  return (
    <Overlay>
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold text-slate-800">
            Wallet information
          </div>
          <IconClose onClick={onClose} />
        </div>

        <div className="px-6 pb-6">
          <p className="text-xs text-slate-500">
            Choose the network you want to deposit through
          </p>

          <div className="mt-4 space-y-3">
            {options.map((opt) => (
              <label
                key={opt.key}
                className="flex items-start gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="network"
                  checked={draft.networkKey === opt.key}
                  onChange={() =>
                    setDraft((d) => ({
                      ...d,
                      networkKey: opt.key,
                      paymentMethod: "Cryptocurrency",
                      currency: opt.title,
                      network: opt.subtitle,
                    }))
                  }
                  className="mt-2 h-4 w-4 accent-[#148DB3]"
                />

                <div
                  className={`mt-1 h-6 w-6 rounded-full ${opt.iconBg} text-white flex items-center justify-center text-xs font-bold`}
                >
                  {opt.iconText}
                </div>

                <div className="leading-tight">
                  <div className="text-xs font-semibold text-slate-800">
                    {opt.title}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {opt.subtitle}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-5">
            <Label>Withdraw Address</Label>
            <Input
              value={draft.withdrawalAddress}
              onChange={(e) =>
                setDraft((d) => ({ ...d, withdrawalAddress: e.target.value }))
              }
            />
          </div>

          <button
            onClick={() => onSubmit(draft)}
            className="mt-6 w-full rounded-md bg-[#148DB3] py-3 text-xs font-bold text-white hover:opacity-95"
          >
            Submit
          </button>
        </div>
      </div>
    </Overlay>
  );
}

/* ---------------------------
   Overlay + UI primitives
---------------------------- */

function Overlay({ children }) {
  // ✅ FIX: always center modals
  return (
    <div className="fixed inset-0 z-[80] bg-black/60">
      <div className="min-h-full w-full p-6 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <div className="text-xs font-medium text-slate-700 mb-2">{children}</div>
  );
}

function Input(props) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={
        "w-full h-10 rounded-md border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none focus:bg-white focus:border-slate-300 disabled:text-slate-400 " +
        className
      }
    />
  );
}

function Select(props) {
  const { className = "", children, ...rest } = props;
  return (
    <div className="relative">
      <select
        {...rest}
        className={
          "w-full h-10 appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 pr-9 text-xs text-slate-800 outline-none focus:bg-white focus:border-slate-300 " +
          className
        }
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
        <ChevronDownIcon />
      </span>
    </div>
  );
}

function InputWithLeftIcon({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
        {icon}
      </span>
      <Input {...props} className="pl-9" />
    </div>
  );
}

function IconClose({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="h-8 w-8 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-600"
      aria-label="Close"
    >
      ✕
    </button>
  );
}

/* ---------------------------
   Tiny card helpers
---------------------------- */
function InfoMini({ label, value }) {
  return (
    <div>
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className="mt-1 text-xs font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function PencilMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

/* Icons */
function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 3v2M17 3v2" />
      <path d="M3 9h18" />
      <path d="M5 6h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/* ---------------------------
   Parent Component
---------------------------- */
export default function LuxbissDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="md:flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <div className="px-4 md:px-6 py-5">
            <ProfileMiddle />
          </div>
        </main>
      </div>
    </div>
  );
}