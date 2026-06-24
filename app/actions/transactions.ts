"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser"; // 1. Import your user helper
import { revalidatePath } from "next/cache";

/**
 * CREATE ACTION: Saves a new transaction log linked to the logged-in user
 */
export async function createTransaction(formData: {
  type: "INCOME" | "EXPENSE";
  amount: number;
  date: string;
}) {
  try {
    // 2. Fetch current user and secure mutation
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized! You must be logged in." };
    }

    if (
      !formData.amount ||
      formData.amount <= 0 ||
      !formData.type ||
      !formData.date
    ) {
      throw new Error("Missing or invalid transaction data.");
    }

    const newTransaction = await db.transaction.create({
      data: {
        type: formData.type,
        amount: formData.amount,
        date: new Date(formData.date),
        userId: user.id, // 👈 3. Link the transaction to the user's ID
      },
    });

    revalidatePath("/");
    return { success: true, data: newTransaction };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to save transaction." };
  }
}

/**
 * UPDATE ACTION: Modifies an existing transaction log securely
 */
export async function updateTransaction(
  id: string,
  formData: {
    type: "INCOME" | "EXPENSE";
    amount: number;
    date: string;
  },
) {
  try {
    // 4. Secure check for updates as well
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized!" };
    }

    if (
      !id ||
      !formData.amount ||
      formData.amount <= 0 ||
      !formData.type ||
      !formData.date
    ) {
      return { success: false, error: "Missing or invalid update data." };
    }

    // 5. Ensure that the user attempting to update actually OWNS this transaction record
    const updatedTransaction = await db.transaction.updateMany({
      where: {
        id: id,
        userId: user.id, // 👈 Security check: prevents manipulating other users' data
      },
      data: {
        type: formData.type,
        amount: formData.amount,
        date: new Date(formData.date),
      },
    });

    // Handle case where transaction wasn't found or wasn't owned by user
    if (updatedTransaction.count === 0) {
      return {
        success: false,
        error: "Transaction not found or unauthorized.",
      };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Database Update Error:", error);
    return { success: false, error: "Failed to update transaction." };
  }
}

/**
 * DELETE ACTION: Permanently removes a transaction log securely
 */
export async function deleteTransaction(id: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized!" };
    }

    if (!id) {
      return { success: false, error: "Missing valid transaction identity." };
    }

    // 6. Security check on delete as well
    const deleted = await db.transaction.deleteMany({
      where: {
        id: id,
        userId: user.id, // 👈 Ensures users can only delete their own transactions
      },
    });

    if (deleted.count === 0) {
      return {
        success: false,
        error: "Transaction not found or unauthorized.",
      };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Database Delete Error:", error);
    return { success: false, error: "Failed to delete transaction." };
  }
}
