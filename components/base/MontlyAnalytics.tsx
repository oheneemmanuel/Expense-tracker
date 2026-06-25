import  { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function getMonthlyAnalytics() {
  const user = await getCurrentUser();
  // 1. Fetch all transactions for this specific user from the database
  if (!user) {
    return [];

  }
  const transactions = await db.transaction.findMany({
    where: {
      userId: user.id,
    },
    select: {
      amount: true,
      type: true,
      date: true, // Using your schema's 'date' field instead of 'createdAt'
    },
  });

  // This object will map keys like "2026-06" to totals
  const monthlyMap: Record<string, { income: number; expenses: number }> = {};

  // 2. Loop through transactions and split by Type
  transactions.forEach((tx) => {
    const txDate = new Date(tx.date);
    // Creates a unique grouping key, e.g., "2026-06"
    const monthKey = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, "0")}`;

    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = { income: 0, expenses: 0 };
    }

    if (tx.type === "INCOME") {
      monthlyMap[monthKey].income += tx.amount;
    } else if (tx.type === "EXPENSE") {
      monthlyMap[monthKey].expenses += tx.amount;
    }
  });

  // 3. Format data array for your UI Table
  const formattedData = Object.entries(monthlyMap).map(([key, value]) => {
    const [year, month] = key.split("-");
    
    // Formats "2026-06" into a readable "June 2026"
    const monthName = new Date(Number(year), Number(month) - 1).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    const netProfit = value.income - value.expenses;

    return {
      month: monthName,
      income: value.income,
      expenses: value.expenses,
      netProfit,
      isProfit: netProfit >= 0,
      sortKey: key, 
    };
  });

  // Sort chronologically, newest months showing first
  return formattedData.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}