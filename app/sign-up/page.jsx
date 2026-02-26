"use client";

import Navbar from "@/componont/Home/Navbar/Navbar";
import React, { useState } from "react";

export default function LuxBissRegister({ onGoogle, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ name, email, password });
  };

  return (
    <div className="min-h-screen w-full bg-[#edf8fc]">
        <div> 
        <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2">
            {/* Simple icon to match the vibe (replace with your SVG if you have one) */}
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
              <span className="relative h-4 w-4">
                <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-slate-900" />
                <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-slate-900" />
                <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-slate-900" />
              </span>
            </span>

            <span className="text-lg font-extrabold tracking-wide text-sky-600">
              LUX <span className="text-sky-500">BISS</span>
            </span>
          </a>

       
        </nav>
        </div>

      {/* Wrapper: responsive + centered */}
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div
          className="w-full max-w-[360px] rounded-2xl bg-white px-6 py-6 sm:max-w-[400px] sm:px-8 sm:py-7"
          style={{
            boxShadow:
              "0 14px 35px rgba(17, 143, 184, 0.18), 0 6px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h1 className="text-center text-xl font-extrabold text-[#1a1a1a] sm:text-[22px]">
            Welcome to Lux Biss
          </h1>
          <p className="mt-1 text-center text-[12px] text-[#6b6b6b] sm:text-[13px]">
            Create an account
          </p>

          <button
            type="button"
            onClick={onGoogle}
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-[#b4e8f7] bg-white py-2.5 text-[13px] font-medium text-[#2b2b2b] shadow-sm transition hover:bg-[#f6fcff] sm:py-3 sm:text-[14px]"
          >
            <GoogleG />
            Continue with Google
          </button>

          <div className="my-4 text-center text-[12px] text-[#8a8a8a] sm:text-[13px]">
            or
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Field
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Enter full name"
              type="text"
            />
            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="Enter email address"
              type="email"
            />
            <Field
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Type Strong password"
              type="password"
            />

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#118fb8] py-2.5 text-[13px] font-semibold text-white shadow-md transition hover:bg-[#0f7ea3] active:scale-[0.99] sm:py-3 sm:text-[14px]"
            >
              Continue
            </button>
          </form>

          <p className="mt-3 text-center text-[10px] text-[#8a8a8a] sm:text-[11px]">
            By continuing, you agree to our{" "}
            <a href="#" className="underline text-[#6f6f6f]">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-[#6f6f6f]">
              Privacy Policy
            </a>
          </p>

          <p className="mt-3 text-center text-[12px] text-[#6b6b6b] sm:text-[13px]">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-[#1f1f1f]">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold text-[#4a4a4a] sm:text-[12px]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="h-9 w-full rounded-lg border border-[#b4e8f7] px-3 text-[12px] text-[#2a2a2a] outline-none placeholder:text-[#b8b8b8] focus:border-[#118fb8] focus:ring-4 focus:ring-[#118fb8]/15 sm:h-10 sm:text-[13px]"
      />
    </div>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.656 32.91 29.201 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.98 6.053 29.765 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 12 24 12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.98 6.053 29.765 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.087 0 9.877-1.953 13.409-5.127l-6.19-5.238C29.154 35.316 26.701 36 24 36c-5.18 0-9.62-3.066-11.285-7.452l-6.52 5.02C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.226-2.313 4.123-4.084 5.404l.003-.002 6.19 5.238C36.971 39.038 44 34 44 24c0-1.341-.138-2.651-.389-3.917z"
      />
    </svg>
  );
}