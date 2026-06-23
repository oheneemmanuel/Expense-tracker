"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  ReceiptText, 
  Tags, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  LogOut 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: ReceiptText },
    { name: "Categories", href: "/categories", icon: Tags },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Logout", href: "/logout", icon: LogOut },
  ];

  // Helper component for the navigation links to avoid code duplication
  const NavLinks = () => (
    <nav className="mt-8 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)} // Closes the mobile drawer when a link is clicked
            className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-emerald-400" : ""}`} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 1. MOBILE HAMBURGER TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-3 z-50 p-2 rounded-lg border border-slate-800 md:hidden hover:bg-white transition-colors focus:outline-none cursor-pointer bg-white text-slate-900"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* 2. MOBILE SIDEBAR DRAWER OVERLAY */}
      {/* Dark backdrop element */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* The actual sliding menu container */}
      <aside 
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20"> {/* Added padding-top to keep content below the fixed X button */}
          <h2 className="text-xl font-bold text-white tracking-wide">
            Many Thanks Hardware
          </h2>
          <NavLinks />
        </div>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
          <span>v1.0.0 Stable</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
        </div>
      </aside>


      {/* 3. DESKTOP SIDEBAR (Untouched, hidden on mobile) */}
      <aside className="w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between hidden md:flex h-screen sticky top-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Many Thanks Hardware
          </h2>
          <NavLinks />
        </div>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
          <span>v1.0.0 Stable</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
        </div>
      </aside>
    </>
  );
}