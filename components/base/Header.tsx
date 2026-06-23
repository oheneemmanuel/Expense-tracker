"use client"; // 1. Ensure this is a client component to use hooks

import { useSession } from "next-auth/react"; // 2. Import useSession hook

export default function Header() {
  const { data: session } = useSession(); // 3. Grab the active session data

  // 4. Get the user's first letter (e.g., "A" for Alice), fallback to "?"
  const userInitial = session?.user?.name 
    ? session.user.name.charAt(0).toUpperCase() 
    : (session?.user?.email ? session.user.email.charAt(0).toUpperCase() : "?");

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 grid grid-cols-3 items-center sticky top-0 z-30">
      <div className="md:hidden" aria-hidden="true"></div>
      <div className="hidden md:block" aria-hidden="true" />
      
      <div className="text-center">
        <h1 className="text-lg font-semibold text-slate-800 whitespace-nowrap">
          Expense Tracker
        </h1>
      </div>
      
      <div className="flex items-center justify-end">
        {/* Profile Circle Avatar */}
        <div 
          title={session?.user?.email || "Not logged in"} 
          className="w-8 h-8 rounded-full bg-blue-600 border border-blue-700 flex items-center justify-center text-sm font-bold text-white shadow-sm"
        >
          {/* 5. Render the dynamic user initial here! */}
          {userInitial}
        </div>
      </div>
    </header>
  );
}