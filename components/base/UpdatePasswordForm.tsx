"use client";

import { FormEvent, useState } from "react";
import { changePassword } from "@/app/actions/changePassword";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm() {
    const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.success) {
        setSuccess(result.success);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        router.push("/login");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Current Password */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="currentPassword"
            value={currentPassword}
            placeholder="••••••••"
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
            required
          />
        </div>
      </div>

      {/* New Password */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
            required
          />
          {/* Toggle Password Visibility Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Repeat new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition"
            required
          />
        </div>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 text-xs font-medium">
          {success}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium text-sm transition shadow-sm mt-2 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span>Updating...</span>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>Update Password</span>
          </>
        )}
      </button>
    </form>
  );
}
