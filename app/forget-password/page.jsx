"use client";

import React, { useState } from "react";

export default function PasswordRecovery({ onSubmit }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ email });
  };

  return (
    <div className="min-h-screen w-full bg-[#edf8fc]">
      {/* Top nav (responsive) */}
      <header className="w-full">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-lg font-extrabold italic tracking-wide">
              <span className="text-black">LUX</span>{" "}
              <span className="text-[#118fb8]">BISS</span>
            </span>
          </a>
        </nav>
      </header>

      {/* Center card (accurate + responsive) */}
      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10 sm:px-6">
        <div
          className="w-full max-w-[320px] rounded-2xl bg-white px-6 py-6 sm:max-w-[360px] sm:px-7 sm:py-7"
          style={{
            boxShadow:
              "0 14px 35px rgba(17, 143, 184, 0.18), 0 6px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h1 className="text-center text-[16px] font-extrabold text-[#1a1a1a] sm:text-[17px]">
            Password Recovery
          </h1>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-[#4a4a4a] sm:text-[12px]">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                type="email"
                className="h-9 w-full rounded-lg border border-[#b4e8f7] bg-white px-3 text-[12px] text-[#2a2a2a] outline-none placeholder:text-[#b8b8b8] focus:border-[#118fb8] focus:ring-4 focus:ring-[#118fb8]/15 sm:h-10 sm:text-[13px]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#118fb8] py-2.5 text-[12px] font-semibold text-white shadow-md transition hover:bg-[#0f7ea3] active:scale-[0.99] sm:py-3 sm:text-[13px]"
            >
              Send Recovery Link
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

/* Logo SVG (matches your Lux Biss style) */
function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M14 44c6-10 14-14 18-14s12 4 18 14"
        fill="none"
        stroke="#118fb8"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="22" r="6" fill="#000" />
      <circle cx="40" cy="22" r="6" fill="#000" />
    </svg>
  );
}