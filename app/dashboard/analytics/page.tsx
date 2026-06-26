// app/analytics/page.tsx
import { getMonthlyAnalytics } from "@/components/base/MontlyAnalytics";
import { getCurrentUser } from "@/lib/getCurrentUser";
import MonthlyCardsList from "@/components/base/MonthlyCardsList";
import { Calendar } from "lucide-react";

export default async function AnalyticsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-black font-medium">Please sign in first</p>
      </div>
    );
  }

  const months = await getMonthlyAnalytics();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        
        <h1 className="text-2xl font-bold tracking-tight text-black flex items-center gap-2">
          <Calendar className="h-6 w-6 text-black" />
          Monthly Performance
        </h1>
        <p className="text-sm text-gray-500">
          Live breakdown calculated from your logged transactions.
        </p>
      </div>

      {/* Pass data into our client-side search and layout component */}
      <MonthlyCardsList months={months} />
    </div>
  );
}
