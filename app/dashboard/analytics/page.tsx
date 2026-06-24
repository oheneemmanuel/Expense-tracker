// app/analytics/page.tsx
import { getMonthlyAnalytics } from "@/components/base/MontlyAnalytics";

export default async function AnalyticsPage() {
  // Replace this placeholder string with your actual session userId check 
  // e.g., const session = await getServerSession(); const userId = session.user.id;
  const currentUserId = "replace-with-actual-user-id"; 
  
  const months = await getMonthlyAnalytics(currentUserId);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Monthly Performance</h1>
        <p className="text-sm text-gray-500">Live breakdown calculated from your logged transactions.</p>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 bg-gray-50 p-4 font-semibold text-sm text-gray-600 border-b">
          <div>Month</div>
          <div className="text-right">Income</div>
          <div className="text-right">Expenses</div>
          <div className="text-right">Net Balance</div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {months.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No transactions logged yet. Start adding entries to view analytics!
            </div>
          ) : (
            months.map((item) => (
              <div key={item.month} className="grid grid-cols-4 p-4 text-sm items-center hover:bg-gray-50/50 transition-colors">
                <div className="font-medium text-gray-900">{item.month}</div>
                <div className="text-right text-green-600 font-medium">GH₵{item.income.toLocaleString()}</div>
                <div className="text-right text-red-600 font-medium">GH₵{item.expenses.toLocaleString()}</div>
                <div className={`text-right font-semibold ${item.isProfit ? "text-blue-600" : "text-amber-600"}`}>
                  {item.isProfit ? "+" : ""}GH₵{item.netProfit.toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}