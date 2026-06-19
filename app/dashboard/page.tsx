import Link from "next/link";
import { mockTransactions } from "../mockData";

export default function DashboardPage() {
  // Calculate total income, expenses, and net profit
  const totalIncome = mockTransactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = mockTransactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Many Thanks Hardware
          </h2>
          <p className="text-sm text-slate-500">
            Live financial health and expense tracking dashboard.
          </p>
        </div>
        <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md self-start sm:self-auto">
          Updated: Just Now
        </div>
      </div>

      {/* 1. FINANCIAL SUMMARY CARDS */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {/* Card 1: Sales */}
      


        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">
              Weekly Revenue
            </h3>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-medium">
              Income
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">₵{totalIncome.toFixed(2)}</p>
          <p className="text-xs text-slate-400 mt-1">
            From recorded hardware sales
          </p>
        </div>

        {/* Card 2: Expenses */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">
              Weekly Expenses
            </h3>
            <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-xs font-medium">
              Outflow
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">₵{totalExpenses.toFixed(2)}</p>
          <p className="text-xs text-slate-400 mt-1">
            Restocking, transport & utilities
          </p>
        </div>

        {/* Card 3: Net Profit */}
        <div className="p-6 bg-blue-50/50 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-blue-700">
              Net Profit Margin
            </h3>
            <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-xs font-medium">
              Balance
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-900">₵{netProfit.toFixed(2)}</p>
          <p className="text-xs text-blue-500/70 mt-1">
            Take-home business income
          </p>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Add New Expense / Income Button */}
        <div>

          <p className="text-sm text-slate-500">
            Feel free to add new expenses or income entries at any time.
          </p> 
          <br></br>


          <Link href="/dashboard/addExpense" className=" bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-center ">
          Add New Expense / Income
          </Link>
        
        </div>
        {/**recent logs */}

        <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Recent Logs
        </h3>
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            No recent logs available.
          </p>
        </div>
        <Link href="/transactions" className="text-xs font-medium text-blue-600 hover:underline">
            View All
        </Link>
      </div>

        
      </div>

      
   
      

    </div>
    
  
  );
}
