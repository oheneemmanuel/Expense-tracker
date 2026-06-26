"use client"; // <--- CRITICAL: Must be at the very top!

import { useState } from "react";
import {
  deleteTransaction,
  updateTransaction,
} from "@/app/actions/transactions"; // Adjust path to your actions file
import { Trash2, Edit2, Check, X, Search } from "lucide-react";

interface Transaction {
  id: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  date: Date | string;
}

export function RecentTransactions({
  initialTransactions,
}: {
  initialTransactions: Transaction[];
}) {
  // Store the ID of the transaction currently being edited
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  // search button state
  const [searchTerm, setSearchTerm] = useState("");

  // Form states for the row actively being edited
  const [editType, setEditType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [editAmount, setEditAmount] = useState<number>(0);
  const [editDate, setEditDate] = useState<string>("");

  // Trigger inline editing mode for a specific row
  const startEditing = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditType(transaction.type);
    setEditAmount(transaction.amount);

    // Parse the date properly for the HTML input field
    const d = new Date(transaction.date);
    setEditDate(d.toISOString().split("T")[0]);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleUpdate = async (id: string) => {
    if (editAmount <= 0) return alert("Amount must be greater than 0");

    setIsMutating(true);
    const res = await updateTransaction(id, {
      type: editType,
      amount: Number(editAmount),
      date: editDate,
    });

    setIsMutating(false);
    if (res.success) {
      setEditingId(null);
    } else {
      alert(res.error || "Failed to update log.");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm("Are you sure you want to permanently delete this transaction?")
    )
      return;

    setIsMutating(true);
    const res = await deleteTransaction(id);
    setIsMutating(false);

    if (!res.success) {
      alert(res.error || "Failed to delete log.");
    }
  };

  // --- FILTER TRANSACTIONS BASED ON SEARCH TERM ---
  const filteredTransactions = initialTransactions.filter((tx) => {
    if (!searchTerm.trim()) return true;

    const lowerSearch = searchTerm.toLowerCase();

    // 1. Format the date to match what the user sees/types (e.g., "Jan 15, 2026")
    const formattedDate = new Date(tx.date)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toLowerCase();

    // 2. Format type and amount to search against
    const typeMatch = tx.type.toLowerCase().includes(lowerSearch);
    const amountMatch = tx.amount.toString().includes(lowerSearch);
    const dateMatch = formattedDate.includes(lowerSearch);

    return typeMatch || amountMatch || dateMatch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Search Input Container */}
      <div className="relative m-5">
        {/* Fixed Tailwind typo: replaced top-1/2-translatee-y-1/2 with -translate-y-1/2 */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by date, year, type, or amount..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
        />
      </div>

      <div className="p-5 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-lg">Recent Transactions</h3>
        <p className="text-xs text-gray-500">Showing your latest activities</p>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Changed from initialTransactions to filteredTransactions */}
        {filteredTransactions.length === 0 ? (
          <p className="p-6 text-center text-sm text-gray-400">
            {initialTransactions.length === 0
              ? "No recent history logged yet."
              : "No transactions match your search."}
          </p>
        ) : (
          filteredTransactions.map((tx) => {
            const isEditing = editingId === tx.id;
            const absoluteDate = new Date(tx.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={tx.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors"
              >
                {/* --- EDITING MODE ROW --- */}
                {isEditing ? (
                  <div className="flex flex-wrap items-center gap-2 w-full">
                    <select
                      value={editType}
                      onChange={(e) =>
                        setEditType(e.target.value as "INCOME" | "EXPENSE")
                      }
                      className="px-2 py-1.5 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="INCOME">Income</option>
                      <option value="EXPENSE">Expense</option>
                    </select>

                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(Number(e.target.value))}
                      className="w-24 px-2 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="0"
                      step="any"
                    />

                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="px-2 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <div className="ml-auto flex items-center gap-1">
                      <button
                        onClick={() => handleUpdate(tx.id)}
                        disabled={isMutating}
                        className="p-1.5 rounded-md text-green-600 hover:bg-green-50 transition-colors disabled:opacity-50"
                        title="Save Changes"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isMutating}
                        className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        title="Cancel"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* --- STANDARD DISPLAY ROW --- */
                  <>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-400 tracking-wider uppercase mb-0.5">
                        {tx.type}
                      </span>
                      <span className="text-sm font-semibold text-gray-600">
                        {absoluteDate}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 ml-0 sm:ml-auto w-full sm:w-auto">
                      <span
                        className={`text-base font-bold ${
                          tx.type === "INCOME"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.type === "INCOME" ? "+" : "-"} GH₵{" "}
                        {Number(tx.amount).toFixed(2)}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEditing(tx)}
                          disabled={isMutating}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Edit transaction"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(tx.id)}
                          disabled={isMutating}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete transaction"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
