"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LuxbissVerifyCodeSplit({
  onSubmit,
  length = 6,          
  initialValue = "",
}) {
  const router = useRouter();

  
  const [email, setEmail] = useState("");

 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [digits, setDigits] = useState(() => {
    const arr = Array.from({ length }, () => "");
    const seed = String(initialValue || "").slice(0, length).split("");
    seed.forEach((ch, i) => (arr[i] = ch));
    return arr;
  });

  const inputsRef = useRef([]);

  const code = useMemo(() => digits.join(""), [digits]);
  const isComplete = useMemo(() => digits.every((d) => d !== ""), [digits]);


  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetPasswordEmail");
    if (!storedEmail) {
      router.push("/user/forgot-password");
      return;
    }
    setEmail(storedEmail);

    const idx = digits.findIndex((d) => d === "");
    const target = idx === -1 ? length - 1 : idx;
    inputsRef.current[target]?.focus?.();
    
  }, [router]);

  const setAt = (idx, val) => {
    setDigits((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const handleChange = (idx, e) => {
    const v = e.target.value.replace(/\D/g, "");
    if (!v) {
      setAt(idx, "");
      return;
    }

    // spread pasted/multi digits
    const chars = v.split("").slice(0, length - idx);
    setDigits((prev) => {
      const next = [...prev];
      chars.forEach((ch, i) => (next[idx + i] = ch));
      return next;
    });

    const nextIndex = Math.min(idx + chars.length, length - 1);
    inputsRef.current[nextIndex]?.focus?.();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        setAt(idx, "");
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus?.();
        setAt(idx - 1, "");
      }
    }

    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus?.();
    if (e.key === "ArrowRight" && idx < length - 1)
      inputsRef.current[idx + 1]?.focus?.();
  };

  const handlePaste = (idx, e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    e.preventDefault();

    const chars = text.split("").slice(0, length - idx);
    setDigits((prev) => {
      const next = [...prev];
      chars.forEach((ch, i) => (next[idx + i] = ch));
      return next;
    });

    const nextIndex = Math.min(idx + chars.length, length - 1);
    inputsRef.current[nextIndex]?.focus?.();
  };

  // ✅ VERIFY OTP HANDLER (email + otp -> backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isComplete || isLoading) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = { email, otp: code }; 
      const res = await api.post("/auth/verify-otp", payload);
      console.log(res);
      sessionStorage.setItem("resetPasswordOtp", code);
      

      setSuccess(res.data?.message || "OTP verified successfully!");

      if (res.data?.resetToken) {
        sessionStorage.setItem("resetToken", res.data.resetToken);
      }

      onSubmit?.({ code, email, response: res.data });

      setTimeout(() => {
        router.push("/user/new-password");
      }, 800);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.request
          ? "No response from server. Please check your connection."
          : "An error occurred. Please try again.");
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleResend = async () => {
    if (!email || isLoading) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setSuccess(res.data?.message || "New code sent!");
      // optional: clear old digits on resend
      setDigits(Array.from({ length }, () => ""));
      inputsRef.current[0]?.focus?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.request
          ? "No response from server. Please check your connection."
          : "An error occurred. Please try again.");
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT IMAGE + OVERLAY */}
        <LeftShowcase />

        {/* RIGHT CONTENT */}
        <div className="relative flex items-center justify-center bg-[#f9fafc] px-6 py-12 sm:px-10">
          {/* Brand */}
          <div className="absolute left-8 top-8 flex items-center gap-2">
            <PlusLogo />
            <span className="text-[20px] font-semibold text-[#111827]">
              Luxbiss
            </span>
          </div>

          <div className="w-full max-w-[420px]">
            <p className="mx-auto max-w-[360px] text-center text-[12px] leading-5 text-[#6b7280]">
              We&apos;ve sent a <b>{length}-digit</b> verification code to your
              registered email address. Please enter the code below to reset your
              password.
            </p>

            {/* show email */}
            {email && (
              <p className="mt-3 text-center text-[12px] text-[#111827]">
                Sent to: <span className="font-semibold">{email}</span>
              </p>
            )}

            {/* messages */}
            {error && (
              <p className="mt-4 text-center text-[12px] text-red-500">
                {error}
              </p>
            )}
            {success && (
              <p className="mt-4 text-center text-[12px] text-green-600">
                {success}
              </p>
            )}

            {/* OTP boxes */}
            <form onSubmit={handleSubmit} className="mt-8">
              {/* ✅ for 6 digits: slightly smaller boxes + tighter gap so it fits nicely */}
              <div className="flex justify-center gap-3 sm:gap-4">
                {Array.from({ length }).map((_, idx) => {
                  const isActive = idx === digits.findIndex((d) => d === "");
                  const filled = digits[idx] !== "";
                  const ring =
                    filled || isActive
                      ? "border-[#1ea7d8] ring-4 ring-[#1ea7d8]/15"
                      : "border-[#e5e7eb]";

                  return (
                    <input
                      key={idx}
                      ref={(el) => (inputsRef.current[idx] = el)}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={length} // allow paste of multiple digits
                      value={digits[idx]}
                      onChange={(e) => handleChange(idx, e)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      onPaste={(e) => handlePaste(idx, e)}
                      className={[
                        // ✅ smaller width so 6 inputs fit cleanly
                        "h-12 w-10 sm:w-12 rounded-xl bg-white text-center text-[18px] font-semibold text-[#111827] outline-none",
                        "shadow-sm border",
                        ring,
                        "focus:border-[#1ea7d8] focus:ring-4 focus:ring-[#1ea7d8]/15",
                      ].join(" ")}
                    />
                  );
                })}
              </div>

              <button
                type="submit"
                disabled={!isComplete || isLoading}
                className={[
                  "mx-auto mt-6 block w-full max-w-[340px] rounded-lg py-2.5 text-[12px] font-semibold text-white transition",
                  isComplete && !isLoading
                    ? "bg-[#1ea7d8] hover:bg-[#1795c2] active:scale-[0.99] cursor-pointer"
                    : "cursor-not-allowed bg-[#8fd3ea]",
                ].join(" ")}
              >
                {isLoading ? "Verifying..." : "Verify Now"}
              </button>
            </form>

            <p className="mt-6 text-center text-[12px] text-[#6b7280]">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading || !email}
                className={[
                  "font-semibold text-[#1ea7d8] underline hover:no-underline",
                  isLoading || !email ? "opacity-60 cursor-not-allowed" : "",
                ].join(" ")}
              >
                {isLoading ? "Sending..." : "Resend"}
              </button>
            </p>

            <p className="mt-4 text-center text-[12px] text-[#6b7280]">
              Already have an account?{" "}
              <Link
                href="/user/login"
                className="font-semibold text-[#1ea7d8] underline hover:no-underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Left Side (same image + cards) ---------------- */

function LeftShowcase() {
  return (
    <div className="relative hidden overflow-hidden lg:block">
      <img
        src="/image.png"
        alt="Luxbiss background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative h-full w-full">
        <div className="absolute left-[12%] top-[31%] w-[360px] rounded-2xl bg-white p-6 shadow-[0_22px_60px_rgba(0,0,0,0.20)]">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[16px] font-semibold text-[#111827]">
                Sales Progress
              </h3>
              <p className="mt-1 text-[12px] text-[#64748b]">This Quarter</p>
            </div>
            <button type="button" className="rounded-md p-1.5 hover:bg-slate-100">
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

        <div className="absolute left-[30%] top-[60%] w-[320px] rounded-2xl bg-white p-5 shadow-[0_22px_60px_rgba(0,0,0,0.20)]">
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
      </div>
    </div>
  );
}

/* ---------------- Icons ---------------- */

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

function DotsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="1.7" fill="#64748b" />
      <circle cx="12" cy="12" r="1.7" fill="#64748b" />
      <circle cx="12" cy="19" r="1.7" fill="#64748b" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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