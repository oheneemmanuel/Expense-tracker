"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignInCard() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Status and UI states
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setIsError(true);
        setMsg("Invalid credentials. Please try again.");
        setIsLoading(false);
      } else {
        setIsError(false);
        setMsg("Login successful! Redirecting...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setIsError(true);
      setMsg("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/dashboard" className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="w-full max-w-md space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
        {/* Header Title Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-950">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your credentials to access your dashboard
          </p>
        </div>

        <form className="mt-6 flex flex-col gap-5" onSubmit={handleLogin}>
          {/* Status Alert Notification Box */}
          {msg && (
            <div
              className={`p-3 rounded-md text-sm text-center font-medium border transition-all ${
                isError
                  ? "bg-red-50 text-red-600 border-red-200"
                  : "bg-green-50 text-green-600 border-green-200"
              }`}
            >
              {msg}
            </div>
          )}

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-bold tracking-wider text-gray-700 uppercase"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-gray-400" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-gray-50 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium placeholder:text-gray-400 focus:border-black focus:bg-white outline-none transition-all text-sm"
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-bold tracking-wider text-gray-700 uppercase"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-900 font-medium placeholder:text-gray-400 focus:border-black focus:bg-white outline-none transition-all text-sm"
                required
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Clear, Standard Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-2 w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Account Recovery */}
        <div className="text-sm text-center pt-2 flex-justify-center gap-5 ">
          <a
            href="#"
            className="font-medium text-gray-600 hover:text-black hover:underline transition-all"
          >
            Forgot your password?
          </a>
           <a
            href="register"
            className="ml-4 font-medium text-gray-600 hover:text-black hover:underline transition-all"
          >
            Create an account?
          </a>
          
        </div>
        
      </div>
    </div>
  );
}
