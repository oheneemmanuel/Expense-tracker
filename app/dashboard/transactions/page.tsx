import { db } from "@/lib/db";
import { RecentTransactions } from "@/components/base/RecentTransaction";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export const metadata = {
  title: "transaction"
}

export default async function TransactionPage() {
  //Get the current looged user
  const user = await getCurrentUser();
  if (!user || !user.id) {
    redirect("/login");
  }


  // Fetch the latest 10 items directly on the server
  const latestTransactions = await db.transaction.findMany({
    where: {
      userId: user.id
    },
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