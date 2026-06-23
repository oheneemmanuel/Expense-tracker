"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Palette used on this page (ties into the existing Aladin/Quicksand/Roboto
// font variables already set up in layout.tsx):
// --indigo     #3B4F73  primary action — dyed-thread blue
// --clay       #B5572A  errors / accent — fired-clay terracotta
// --kraft      #ECE3CC  card background — kraft tag paper
// --kraft-soft #F6EFDC  input background — lighter kraft
// --ink        #2B2420  text — dark walnut ink
// --thread     #8C7A5B  muted text, borders — jute thread

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Failed to register");
      return;
    }

    // Automatically log the user in after a successful registration
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      router.push("/login");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="hh-weave relative flex min-h-screen items-center justify-center bg-[#D9D2C2] px-4 py-16">
      <style>{`
        .hh-weave {
          background-image: radial-gradient(rgba(43,36,32,0.06) 1px, transparent 1px);
          background-size: 14px 14px;
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm -rotate-[0.6deg] rounded-sm border-2 border-dashed border-[#8C7A5B] bg-[#ECE3CC] p-8 pt-12 shadow-xl"
      >
        {/* swing-tag hole + string */}
        <svg
          aria-hidden="true"
          viewBox="0 0 60 40"
          className="absolute -top-7 left-1/2 h-10 w-16 -translate-x-1/2"
        >
          <path
            d="M10 35 Q30 -6 50 35"
            fill="none"
            stroke="#8C7A5B"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <circle cx="30" cy="7" r="4.5" fill="#ECE3CC" stroke="#2B2420" strokeWidth="2" />
        </svg>

        <h1 className="text-center text-3xl text-[#2B2420] [font-family:var(--font-title)]">
          Create an Account
        </h1>
        <p className="mt-1 text-center text-xs uppercase tracking-widest text-[#8C7A5B] [font-family:var(--font-small)]">
          Join our community of makers
        </p>

        {error && (
          <div className="mt-5 rounded-sm border border-[#B5572A]/40 bg-[#B5572A]/10 px-3 py-2 text-sm text-[#B5572A] [font-family:var(--font-body)]">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-xs uppercase tracking-wide text-[#8C7A5B] [font-family:var(--font-small)]"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jane Maker"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-sm border border-[#8C7A5B]/40 bg-[#F6EFDC] px-3 py-2.5 text-[#2B2420] placeholder:text-[#8C7A5B]/60 [font-family:var(--font-body)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3B4F73]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs uppercase tracking-wide text-[#8C7A5B] [font-family:var(--font-small)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-sm border border-[#8C7A5B]/40 bg-[#F6EFDC] px-3 py-2.5 text-[#2B2420] placeholder:text-[#8C7A5B]/60 [font-family:var(--font-body)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3B4F73]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs uppercase tracking-wide text-[#8C7A5B] [font-family:var(--font-small)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-sm border border-[#8C7A5B]/40 bg-[#F6EFDC] px-3 py-2.5 text-[#2B2420] placeholder:text-[#8C7A5B]/60 [font-family:var(--font-body)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3B4F73]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-7 w-full rounded-sm bg-[#3B4F73] py-3 font-semibold tracking-wide text-[#ECE3CC] [font-family:var(--font-body)] transition-colors hover:bg-[#314363] focus:outline-none focus:ring-2 focus:ring-[#2B2420] focus:ring-offset-2 focus:ring-offset-[#ECE3CC]"
        >
          Register
        </button>

        <p className="mt-5 text-center text-sm text-[#8C7A5B] [font-family:var(--font-body)]">
          Already part of the workshop?{" "}
          <a
            href="/login"
            className="text-[#3B4F73] underline underline-offset-2 hover:text-[#2B2420]"
          >
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}