import { db } from "@/lib/db";
import { RecentTransactions } from "@/components/base/RecentTransaction";

export const metadata = {
  title: "transaction"
}

export default async function TransactionPage() {
  // Fetch the latest 10 items directly on the server
  const latestTransactions = await db.transaction.findMany({
    orderBy: {
      date: "desc",
    },
    take: 10,
  });

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Your form or total balance cards go up here */}
      <p className="text-gray-600 text-sm">
        Below are your most recent transactions. You can edit or delete them as needed.
      </p>
      
      <RecentTransactions initialTransactions={latestTransactions} />
    </div>
  );
}