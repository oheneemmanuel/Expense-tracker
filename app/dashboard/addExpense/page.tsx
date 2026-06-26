"use client";

import { useState } from "react";
// Importing your named server action
import { createTransaction } from "@/app/actions/transactions";
//import redirect
import { useRouter } from "next/navigation";

export default function AddExpensePage() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [type, setType] = useState<"INCOME" | "EXPENSE" | "">("");
  

  // a router to direct to the dashboard after adding transaction
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent submission if fields are empty
    if (!type || !amount || !date) return;

    // Call your backend server action directly
    const result = await createTransaction({
      type: type as "INCOME" | "EXPENSE",
      date,
      amount: parseFloat(amount),
    });

    if (result.success) {
      // Clear the form fields seamlessly on success
      setAmount("");
      setType("");
      setDate(new Date().toISOString().split("T")[0]);

      router.push("/dashboard")
      
      
    } else {
      alert("Error saving transaction: " + result.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-6 rounded-xl border border-black-200 shadow-sm h-fit">
        <h3 className="font-semibold text-black-900 mb-4 text-base">
          Log New Transaction
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* TYPE */}
          <div>
            <label className="block text-xs font-semibold text-black-600 uppercase mb-1">
              Type
            </label>

            <select
              className="w-full text-sm p-2.5 bg-black-50 border border-black-200 rounded-lg focus:outline-none focus:border-blue-500"
              value={type}
              onChange={(e) =>
                setType(e.target.value as "INCOME" | "EXPENSE")
              }
            >
              <option value="">Select A Transaction Type</option>
              <option value="EXPENSE">Expense (Buying Stock, Costs)</option>
              <option value="INCOME">Income (Hardware Sale)</option>
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="block text-xs font-semibold text-black-600 uppercase mb-1">
              Date
            </label>

            <input
              type="date"
              className="w-full text-sm p-2.5 bg-black-50 border border-black-200 rounded-lg focus:outline-none focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="block text-xs font-semibold text-black-600 uppercase mb-1">
              Amount (₵)
            </label>

            <input
              type="number"
              placeholder="0.00"
              className="w-full text-sm p-2.5 bg-black-50 border border-black-200 rounded-lg focus:outline-none focus:border-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm mt-2"
          >
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
}