// app/login/page.jsx  (Next.js App Router)
// Sign-in page/component matching your screenshot (colors + layout)
// TailwindCSS required.

import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import Navbar from "@/componont/Home/Navbar/Navbar";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#EAF6FB]">
      {/* top-left logo */}
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

      {/* centered card */}
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center px-4 pb-10">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[0_14px_40px_rgba(2,132,199,0.18)] ring-1 ring-slate-200">
          <h1 className="text-center text-xl font-extrabold text-slate-900">
            Welcome Back
          </h1>

          {/* Google button */}
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
          >
            {/* Google "G" */}
            <span className="grid h-5 w-5 place-items-center">
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.04 1.53 7.43 2.8l5.1-4.9C33.4 4.4 29.1 2.5 24 2.5 14.9 2.5 7.2 7.9 3.7 15.7l6.1 4.7C11.6 14.2 17.3 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.4-.1-2.4-.4-3.5H24v6.6h12.6c-.3 1.7-1.8 4.2-5 5.9l6 4.6c3.5-3.2 5.5-8 5.5-13.6z"
                />
                <path
                  fill="#FBBC05"
                  d="M9.8 28.5c-.4-1.2-.6-2.5-.6-3.9s.2-2.7.6-3.9l-6.1-4.7C2.4 18.7 1.6 21.5 1.6 24.6s.8 5.9 2.1 8.6l6.1-4.7z"
                />
                <path
                  fill="#34A853"
                  d="M24 46.5c5.1 0 9.4-1.7 12.6-4.6l-6-4.6c-1.6 1.1-3.8 1.9-6.6 1.9-6.7 0-12.4-4.7-14.2-11.1l-6.1 4.7C7.2 40.6 14.9 46.5 24 46.5z"
                />
              </svg>
            </span>
            Continue with Google
          </button>

          {/* divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* form */}
          <form className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full rounded-xl border border-sky-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-sky-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-sky-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-sky-400"
                />
              </div>

              <div className="mt-2 text-left">
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-slate-500 hover:text-sky-700 hover:underline"
                >
                  Forgot Password
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#0C6FA6] py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0A5F90]"
            >
              Continue
            </button>
          </form>

          <p className="mt-3 text-center text-[10.5px] text-slate-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-sky-700 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-sky-700 hover:underline">
              Privacy Policy
            </a>
          </p>

          <p className="mt-2 text-center text-xs text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-slate-900 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}