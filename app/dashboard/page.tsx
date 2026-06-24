import Link from "next/link";
import { db } from "@/lib/db"; // Import your Prisma singleton
import { getCurrentUser } from "@/lib/getCurrentUser"; // Import your custom email lookup helper
import { redirect } from "next/navigation"; // Import redirect for server-side redirection
import { TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

import { TransactionType } from "@prisma/client"; // Import your Transaction type

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // 1. Fetch data directly from the database
  const transactions = await db.transaction.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // --- TIME COMPARISON LOGIC ---
  const now = new Date();

  // Setup Start of Today (00:00:00)
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  // Setup Start of Current Week (Assuming week starts on Monday)
  const currentDay = now.getDay();
  const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1; // Adjust if Sunday (0)
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - distanceToMonday,
  );
  startOfWeek.setHours(0, 0, 0, 0);

  // Setup Start of Current Month (1st day of the month at 00:00:00)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // --- CALCULATIONS ---

  // CARD 1: Daily Expenses
  const dailyExpenses = transactions
    .filter(
      (tx) =>
        tx.type === TransactionType.EXPENSE &&
        new Date(tx.createdAt) >= startOfToday,
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  // CARD 2: Weekly Summary (Income vs Expense)
  const weeklyIncome = transactions
    .filter(
      (tx) =>
        tx.type === TransactionType.INCOME &&
        new Date(tx.createdAt) >= startOfWeek,
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const weeklyExpenses = transactions
    .filter(
      (tx) =>
        tx.type === TransactionType.EXPENSE &&
        new Date(tx.createdAt) >= startOfWeek,
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  // CARD 3: Monthly Net Summary
  const monthlyIncome = transactions
    .filter(
      (tx) =>
        tx.type === TransactionType.INCOME &&
        new Date(tx.createdAt) >= startOfMonth,
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const monthlyExpenses = transactions
    .filter(
      (tx) =>
        tx.type === TransactionType.EXPENSE &&
        new Date(tx.createdAt) >= startOfMonth,
    )
    .reduce((sum, tx) => sum + tx.amount, 0);

  const monthlyNetProfit = monthlyIncome - monthlyExpenses;

  // For the comparison bars and savings rate
  const weekMax = Math.max(weeklyIncome, weeklyExpenses, 1);
  const weeklyNet = weeklyIncome - weeklyExpenses;
  const savingsRate =
    monthlyIncome > 0
      ? Math.round((monthlyNetProfit / monthlyIncome) * 100)
      : null;
  const monthTotal = monthlyIncome + monthlyExpenses || 1;

  // Since orderBy desc is applied above, the newest transactions are already first
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
            WELCOME BACK, {user.name || user.email}!
          </h2>
          <p className="text-sm text-slate-500">
            Live financial health and expense tracking dashboard.
          </p>
        </div>
        <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md self-start sm:self-auto">
          Updated: Just Now
        </div>
      </div>

      {/* FINANCIAL SUMMARY CARDS */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {/* Card 1: Daily Expenses */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">
              Today's Expenses
            </h3>
            <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-xs font-medium">
              Daily Outflow
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            ₵{dailyExpenses.toFixed(2)}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Total expenses recorded today
          </p>
        </div>

        {/* Card 2: Weekly Overview */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">
              Weekly Overview
            </h3>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-medium">
              This Week
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1 text-slate-500">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  Income
                </span>
                <span className="font-semibold text-emerald-600">
                  ₵{weeklyIncome.toFixed(2)}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${(weeklyIncome / weekMax) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1 text-slate-500">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                  Expenses
                </span>
                <span className="font-semibold text-rose-600">
                  ₵{weeklyExpenses.toFixed(2)}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all"
                  style={{ width: `${(weeklyExpenses / weekMax) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Net since Monday</span>
            <span
              className={`text-sm font-bold ${
                weeklyNet >= 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {weeklyNet >= 0 ? "+" : "−"}₵{Math.abs(weeklyNet).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Card 3: Monthly Net Summary */}
        <div
          className={`p-6 rounded-xl border shadow-sm ${
            monthlyNetProfit >= 0
              ? "bg-blue-50/50 border-blue-100"
              : "bg-amber-50/50 border-amber-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3
              className={`text-sm font-medium ${
                monthlyNetProfit >= 0 ? "text-blue-700" : "text-amber-700"
              }`}
            >
              Monthly Net Summary
            </h3>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                monthlyNetProfit >= 0
                  ? "text-blue-700 bg-blue-100"
                  : "text-amber-700 bg-amber-100"
              }`}
            >
              This Month
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <p
              className={`text-3xl font-bold ${
                monthlyNetProfit >= 0 ? "text-blue-900" : "text-amber-900"
              }`}
            >
              ₵{monthlyNetProfit.toFixed(2)}
            </p>
            {savingsRate !== null && (
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  monthlyNetProfit >= 0 ? "text-blue-600" : "text-amber-600"
                }`}
              >
                <PiggyBank className="w-3.5 h-3.5" />
                {savingsRate}% saved
              </span>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex h-2 rounded-full overflow-hidden bg-white/60">
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${(monthlyIncome / monthTotal) * 100}%` }}
              />
              <div
                className="bg-amber-500 h-full"
                style={{ width: `${(monthlyExpenses / monthTotal) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-blue-700/80">
                Income ₵{monthlyIncome.toFixed(2)}
              </span>
              <span className="text-amber-700/80">
                Expenses ₵{monthlyExpenses.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Actions Button */}
        <div>
          <p className="text-sm text-slate-500">
            Feel free to add new expenses or income entries at any time.
          </p>
          <br />
          <Link
            href="/dashboard/addExpense"
            className="inline-block bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-center px-4 py-2"
          >
            Add New Expense / Income
          </Link>
        </div>

        {/** RECENT LOGS */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Recent Logs
          </h3>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-sm text-slate-500">
                No recent logs available.
              </p>
            ) : (
              recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center text-sm border-b border-slate-50 pb-2"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {tx.type}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      tx.type === TransactionType.INCOME
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {tx.type === TransactionType.INCOME ? "+" : "-"} ₵
                    {tx.amount.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="mt-4">
            <Link
              href="/dashboard/transactions"
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
