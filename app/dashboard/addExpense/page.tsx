"use client";

import {useState} from "react";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date
  const [type, setType] = useState("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Transaction Details:", {
      type,
      date,
      amount: parseFloat(amount),
    });
  } 

  return (
    
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
      <h3 className="font-semibold text-slate-900 mb-4 text-base">
        Log New Transaction
      </h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
            Type
          </label>
          <select 
            className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Select A Transaction Type
            </option>
            <option value="expense">Expense (Buying Stock, Costs)</option>
            <option value="income">Income (Hardware Sale)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
            Date
          </label>
          <div className="flex items-center gap-4">
            <input
              type="date"
              className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
     
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
            Amount (₵)
          </label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full text-sm p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm mt-2"
        >
          Save Transaction
        </button>
      </form>
    </div>
  );
}
