"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTransaction(formData: {
  type: "INCOME" | "EXPENSE"; // Matched to your uppercase form state
  amount: number;
  date: string;
}) {
  try {
    if (!formData.amount || formData.amount <= 0 || !formData.type || !formData.date) {
      throw new Error("Missing or invalid transaction data.");
    }

    const newTransaction = await db.transaction.create({
      data: {
        type: formData.type, // Direct pass-through, no string manipulation needed!
        amount: formData.amount,
        date: new Date(formData.date),
      },
    });

    revalidatePath("/");
    return { success: true, data: newTransaction };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to save transaction." };
  }
}