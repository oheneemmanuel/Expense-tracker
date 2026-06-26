"use client";

import { useState } from "react";
import { KeyRound, ShieldAlert, ChevronRight } from "lucide-react";
import ChangePasswordForm from "@/components/base/UpdatePasswordForm";
import { deleteAccount } from "@/app/actions/deleteAccount"; // Your server action
import { signOut } from "next-auth/react"; // <--- Import client-side sign out

export default function SettingsPage() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      "WARNING: Permanently delete your account? This cannot be undone.",
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      // 1. Fire the server action to delete from DB
      const res = await deleteAccount();

      if (res?.error) {
        alert(res.error);
        return;
      }

      // 2. If DB wipe is successful, clear Auth.js session and redirect
      if (res?.success) {
        await signOut({ callbackUrl: "/login" });
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto min-h-screen p-4 md:p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-950">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account security and data options.
        </p>
      </div>

      <div className="space-y-4">
        {/* Row 1: Change Password */}
        <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="w-full flex items-center justify-between p-5 text-left transition hover:bg-gray-50 focus:outline-none"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mt-0.5">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Change Password
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Update your account password to stay safe and secure.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Row 2: Delete Account */}
        <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="w-full flex items-center justify-between p-5 text-left transition hover:bg-red-50/30 focus:outline-none disabled:opacity-50"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-red-600">
                  {isDeleting ? "Deleting Account..." : "Delete Account"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Permanently remove your profile and all financial logs.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* --- POPUP / MODAL DIALOG --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setIsPasswordModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-xl shadow-xl border border-gray-100 p-6 z-10">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-950">
                Update Password
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Please confirm your current password before saving a new one.
              </p>
            </div>
            <ChangePasswordForm />
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
