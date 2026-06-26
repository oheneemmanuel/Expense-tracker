"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAndResetPassword } from "@/app/actions/authReset";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Controls eye toggle state
  const [step, setStep] = useState(1); // Step 1: Verify Email, Step 2: Enter New Password
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStep(2); // Move to the password input step
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const res = await verifyAndResetPassword(email, password);

    if (res.error) {
      setMessage(res.error);
      setStep(1); // Kick back to step 1 if the email wasn't found
    } else if (res.success) {
      setMessage(res.success);
      setTimeout(() => {
        router.push("/login"); // Send back to login after 2 seconds
      }, 2000);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Account Recovery
        </h2>
        <p className="text-xs text-gray-500 mt-1 mb-6">
          Reset your credentials without email configuration.
        </p>

        {step === 1 ? (
          /* --- STEP 1: VERIFY EMAIL --- */
          <form onSubmit={handleNextStep} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 tracking-wider">
                Confirm Your Account Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                placeholder="name@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg text-sm transition"
            >
              Continue
            </button>
          </form>
        ) : (
          /* --- STEP 2: ENTER NEW PASSWORD --- */
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-1 tracking-wider">
                Account Email
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1 tracking-wider">
                Choose New Password
              </label>
              <div className="relative mt-1 rounded-lg shadow-sm">
                {/* Decorative Lock Icon */}
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>

                {/* Password Input Field */}
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-10 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                  placeholder="••••••••"
                />

                {/* Eye Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg text-sm transition disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}

        {message && (
          <p className="mt-5 text-center text-xs font-medium text-gray-700 bg-gray-50 border border-gray-100 p-3 rounded-xl">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
