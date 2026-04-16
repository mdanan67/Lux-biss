"use client";

import React, { useState,createContext, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth.js";
import { useAuth } from "@/Context/AuthProvider";

export default function LuxbissLoginSplit({ onGoogle }) {
  const { setAuthUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     let alldata= await login(email, password);
       setAuthUser(alldata.role);
      console.log(alldata);
      
      localStorage.setItem("user", JSON.stringify(alldata.role));
      if (alldata.role=="user") {
        router.push("/user/dashbord");
      }
       else if (alldata.role=="admin") {
        router.push("/admin/dashbord");
      }
      
       
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
              className="mx-auto mt-6 flex w-full max-w-[300px] items-center justify-center gap-2 rounded-lg border border-[#cfd6e6] bg-white py-2 text-[12px] font-medium text-[#111827] shadow-sm hover:bg-[#f7f9ff] cursor-pointer"
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
                    onClick={() => router.push("/user/forgot-password")}
                    className="text-[12px] font-semibold text-[#1ea7d8] hover:underline cursor-pointer"
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 cursor-pointer text-[#7b8498] hover:bg-[#f2f5ff]"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="mt-2 w-full rounded-lg cursor-pointer bg-[#1ea7d8] py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#1795c2] active:scale-[0.99]"
              >
                Log in
              </button>
            </form>

            <p className="mt-7 text-center text-[12px] text-[#6b7280]">
              Don&apos;t have an account?{" "}
              <Link
                href="/user/registration"
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


function LeftShowcase() {
  return (
    <div className="relative hidden lg:block h-screen w-full overflow-hidden">
      {/* Full height + full width of left column */}
      <img
        src="/image.png"
        alt="Luxbiss background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Optional subtle overlay (helps cards pop on bright images) */}
      <div className="absolute inset-0 bg-black/0" />

      <div className="relative h-full w-full">
        {/* Main card */}
        <div className="absolute left-[12%] top-[26%] w-[360px] rounded-2xl bg-white p-6 shadow-[0_22px_60px_rgba(0,0,0,0.20)]">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[16px] font-semibold text-[#111827]">
                Sales Progress
              </h3>
              <p className="mt-1 text-[12px] text-[#64748b]">This Quarter</p>
            </div>
            <button
              type="button"
              className="rounded-md p-1.5 hover:bg-slate-100"
              aria-label="More"
            >
              <DotsIcon />
            </button>
          </div>

          <div className="mt-5 flex justify-center">
            <div className="relative h-[170px] w-[260px]">
              <div className="absolute left-1/2 top-3 h-[220px] w-[220px] -translate-x-1/2 rounded-full border-[14px] border-[#eef2f6] border-b-transparent border-l-transparent border-r-transparent" />
              <div className="absolute left-1/2 top-3 h-[220px] w-[220px] -translate-x-1/2 rotate-[-18deg] rounded-full border-[14px] border-[#1ea7d8] border-b-transparent border-l-transparent border-r-transparent" />

              <div className="absolute left-1/2 top-[66px] -translate-x-1/2 text-center">
                <div className="text-[22px] font-bold text-[#111827]">
                  75.55%
                </div>
                <span className="mt-1 inline-flex items-center rounded-full bg-[#eaf7ef] px-2 py-0.5 text-[11px] font-semibold text-[#16a34a]">
                  +10%
                </span>
              </div>
            </div>
          </div>

          <p className="-mt-2 text-center text-[12px] text-[#64748b]">
            You succeed earn{" "}
            <span className="font-semibold text-[#111827]">$240</span> today, its
            higher than
          </p>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white p-4">
              <p className="text-[11px] text-[#64748b]">Target</p>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-[18px] font-bold text-[#111827]">$20k</p>
                <span className="text-[13px] font-bold text-[#ef4444]">↓</span>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4">
              <p className="text-[11px] text-[#64748b]">Revenue</p>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-[18px] font-bold text-[#111827]">$25k</p>
                <span className="text-[13px] font-bold text-[#16a34a]">↑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Small revenue card */}
        <div className="absolute left-[28%] top-[56%] w-[320px] rounded-2xl bg-white p-5 shadow-[0_22px_60px_rgba(0,0,0,0.20)]">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef2ff]">
              <BadgeIcon />
            </div>
            <div>
              <p className="text-[12px] font-medium text-[#64748b]">
                Total Revenue
              </p>
              <div className="mt-1 flex items-center gap-3">
                <p className="text-[20px] font-extrabold text-[#111827]">
                  $75,500
                </p>
                <span className="inline-flex items-center rounded-full bg-[#eaf7ef] px-2 py-0.5 text-[11px] font-semibold text-[#16a34a]">
                  +10%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: keep overlays centered on very wide screens */}
        {/* <div className="absolute inset-y-0 left-0 w-[640px]" /> */}
      </div>
    </div>
  );
}

/* ---------------- Field ---------------- */

function Field({ label, placeholder, value, onChange, type, disabled }) {
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
        disabled={disabled}
        className={`h-10 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-[12px] text-[#111827] outline-none placeholder:text-[#b6bfce]
          focus:border-[#1ea7d8] focus:ring-4 focus:ring-[#1ea7d8]/15
          ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`}
      />
    </div>
  );
}



function PlusLogo() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 4.5v15M4.5 12h15"
        stroke="#1ea7d8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="5" r="1.7" fill="#64748b" />
      <circle cx="12" cy="12" r="1.7" fill="#64748b" />
      <circle cx="12" cy="19" r="1.7" fill="#64748b" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4"
        stroke="#6366f1"
        strokeWidth="1.8"
      />
      <path
        d="M8 12l2.2 2.2L16.5 8.9"
        stroke="#6366f1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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