"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth.js";

export default function LuxbissLoginSplit({ onGoogle }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      await login(email, password);

      router.push("/dashbord");
    } catch (err) {
      console.log("LOGIN ERROR:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT IMAGE + OVERLAY */}
        <LeftShowcase />

        {/* RIGHT FORM */}
        <div className="relative flex items-center justify-center bg-[#f9fafc] px-6 py-12 sm:px-10">
          {/* Brand (top-left) */}
          <div className="absolute left-8 top-8 flex items-center gap-2">
            <PlusLogo />
            <span className="text-[20px] font-semibold text-[#111827]">
              Luxbiss
            </span>
          </div>

          <div className="w-full max-w-[360px]">
            <h1 className="text-center text-[24px] font-extrabold text-[#111827]">
              Welcome Back!
            </h1>
            <p className="mt-2 text-center text-[13px] text-[#6b7280]">
              Welcome back, please enter your details.
            </p>

            {/* Google */}
            <button
              type="button"
              onClick={onGoogle}
              className="mx-auto mt-6 flex w-full max-w-[300px] items-center justify-center gap-2 rounded-lg border border-[#cfd6e6] bg-white py-2 text-[12px] font-medium text-[#111827] shadow-sm hover:bg-[#f7f9ff]"
            >
              <GoogleG />
              Login with Google
            </button>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e5e7eb]" />
              <div className="text-[12px] text-[#9aa3b2]">or</div>
              <div className="h-px flex-1 bg-[#e5e7eb]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <Field
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={setEmail}
                type="email"
              />

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[12px] font-medium text-[#374151]">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-[12px] font-semibold text-[#1ea7d8] hover:underline"
                  >
                    Forgot Password
                  </button>
                </div>

                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    type={showPass ? "text" : "password"}
                    className="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 pr-10 text-[12px] text-[#111827] outline-none placeholder:text-[#b6bfce] focus:border-[#1ea7d8] focus:ring-4 focus:ring-[#1ea7d8]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-[#7b8498] hover:bg-[#f2f5ff]"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-[#1ea7d8] py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#1795c2] active:scale-[0.99]"
              >
                Log in
              </button>
            </form>

            <p className="mt-7 text-center text-[12px] text-[#6b7280]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#1ea7d8] hover:underline"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Left Side ---------------- */

function LeftShowcase() {
  return (
    <div className="relative hidden overflow-hidden lg:block">
      <img
        src="/image.png"
        alt="Luxbiss background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative h-full w-full">{/* ... unchanged ... */}</div>
    </div>
  );
}

/* ---------------- Field ---------------- */

function Field({ label, placeholder, value, onChange, type }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-[#374151]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-[12px] text-[#111827] outline-none placeholder:text-[#b6bfce] focus:border-[#1ea7d8] focus:ring-4 focus:ring-[#1ea7d8]/15"
      />
    </div>
  );
}

/* ---------------- Icons (unchanged) ---------------- */

function PlusLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4.5v15M4.5 12h15"
        stroke="#1ea7d8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
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