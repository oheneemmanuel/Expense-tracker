import Link from "next/link";

export default function TransactionPage() {
    const data = [
    { id: 1, type: "Income", amount: 5000, category: "Sales", date: "2024-06-01" },
    { id: 2, type: "Expense", amount: 1500, category: "Inventory", date: "2024-06-02" },
    { id: 3, type: "Expense", amount: 300, category: "Transport", date: "2024-06-03" },
    { id: 4, type: "Income", amount: 2000, category: "Services", date: "2024-06-04" },
    { id: 5, type: "Expense", amount: 800, category: "Utilities", date: "2024-06-05" },
  ];
    return (
        <div className="space-y-8 max-w-6xl mx-auto p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Transactions
                    </h2>
                </div>
                {data.map((data) => (
                    <li key={data.id} className="text-sm text-slate-500">
                        {data.type} - ₵{data.amount} - {data.category} - {data.date}
                    </li>

                ))}
            </div>

        </div>
    )
}