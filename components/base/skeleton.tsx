// Loading animation utility class
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

/**
 * 1. Summary Card Skeleton (For Total Balance, Total Income, Total Expenses)
 */
export function MetricCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-100`}
    >
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 rounded-md bg-gray-200" />
        <div className="h-8 w-8 rounded-lg bg-gray-100" />
      </div>
      <div className="mt-4 h-8 w-32 rounded-md bg-gray-200" />
      <div className="mt-2 h-3 w-40 rounded-md bg-gray-100" />
    </div>
  );
}

/**
 * 2. Transaction List Row Skeleton (Matches your Recent Transactions row design)
 */
export function TransactionRowSkeleton() {
  return (
    <div className="p-4 flex items-center justify-between gap-3 border-b border-gray-50 last:border-0">
      <div className="flex flex-col gap-2">
        {/* Mocking the Type Label (INCOME/EXPENSE) */}
        <div className="h-3 w-14 rounded bg-gray-200" />
        {/* Mocking the Date text */}
        <div className="h-4 w-28 rounded bg-gray-100" />
      </div>

      <div className="flex items-center gap-6">
        {/* Mocking the Amount (e.g., GH₵ 150.00) */}
        <div className="h-5 w-20 rounded bg-gray-200" />

        {/* Mocking the Action Buttons (Edit and Delete) */}
        <div className="flex items-center gap-1">
          <div className="h-8 w-8 rounded-lg bg-gray-100" />
          <div className="h-8 w-8 rounded-lg bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Recent Transactions Card Container Skeleton
 */
export function RecentTransactionsSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100`}
    >
      <div className="p-5 border-b border-gray-100">
        <div className="h-5 w-44 rounded-md bg-gray-200" />
        <div className="mt-2 h-3 w-36 rounded-md bg-gray-100" />
      </div>

      <div className="divide-y divide-gray-100 bg-white">
        <TransactionRowSkeleton />
        <TransactionRowSkeleton />
        <TransactionRowSkeleton />
        <TransactionRowSkeleton />
        <TransactionRowSkeleton />
      </div>
    </div>
  );
}

/**
 * 4. Full Dashboard Layout Fallback (Metrics stacked above Transactions List)
 */
export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page Title Header Mockup */}
      <div
        className={`${shimmer} relative h-7 w-48 overflow-hidden rounded-md bg-gray-200`}
      />

      {/* Summary Metrics Row Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>

      {/* Main Ledger List Area directly underneath */}
      <div className="w-full">
        <RecentTransactionsSkeleton />
      </div>
    </div>
  );
}
