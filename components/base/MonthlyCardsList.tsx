"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Wallet, Search } from "lucide-react";

interface MonthData {
  month: string;
  income: number;
  expenses: number;
  netProfit: number;
  isProfit: boolean;
  sortKey: string;
}

export default function MonthlyCardsList({ months }: { months: MonthData[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");

  // 1. Extract all unique years from the data to build the year dropdown dynamically
  const uniqueYears = [
    "All",
    ...new Set(months.map((item) => item.month.split(" ")[1])),
  ];

  // 2. Filter the months list based on search text and selected year
  const filteredMonths = months.filter((item) => {
    const matchesSearch = item.month
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesYear =
      selectedYear === "All" || item.month.includes(selectedYear);
    return matchesSearch && matchesYear;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        {/* Month Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by month (e.g., May)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
          />
        </div>

        {/* Year Dropdown Filter */}
        <div className="w-full sm:w-48">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year === "All" ? "All Years" : year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Render Cards Grid */}
      {filteredMonths.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-500 border rounded-xl bg-white shadow-sm">
          No matching transactions found for "{searchTerm || selectedYear}".
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMonths.map((item) => (
            <div
              key={item.sortKey || item.month}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="border-b border-gray-100 pb-3 mb-4 flex justify-between items-center">
                <span className="font-semibold text-lg text-black">
                  {item.month}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    item.isProfit
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {item.isProfit ? "Surplus" : "Deficit"}
                </span>
              </div>

              {/* Card Body */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-green-600" /> Income
                  </span>
                  <span className="font-semibold text-gray-900">
                    GH₵{item.income.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <TrendingDown className="h-4 w-4 text-red-600" /> Expenses
                  </span>
                  <span className="font-semibold text-gray-900">
                    GH₵{item.expenses.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5" /> Net Balance
                </span>
                <span
                  className={`font-bold text-base ${
                    item.isProfit ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.isProfit ? "+" : ""}GH₵{item.netProfit.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
