// app/mockData.ts
export interface Transaction {
  id: number;
  type: "Income" | "Expense";
  amount: number;
  category: string;
  date: string;
}

export const mockTransactions: Transaction[] = [
  { id: 1, type: "Income", amount: 5000, category: "Sales", date: "2024-06-01" },
  { id: 2, type: "Expense", amount: 1500, category: "Inventory", date: "2024-06-02" },
  { id: 3, type: "Expense", amount: 300, category: "Transport", date: "2024-06-03" },
  { id: 4, type: "Income", amount: 2000, category: "Services", date: "2024-06-04" },
  { id: 5, type: "Expense", amount: 800, category: "Utilities", date: "2024-06-05" },
  { id: 6, type: "Income", amount: 1200, category: "Sales", date: "2024-06-06" },
];