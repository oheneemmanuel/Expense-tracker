"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function deleteAccount() {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    // 1. Manually delete all related records first
    
    await db.transaction.deleteMany({
      where: { userId: user.id },
    });

    
    // await db.account.deleteMany({ where: { userId: user.id } });
    // await db.session.deleteMany({ where: { userId: user.id } });

    // 2. Now it's safe to delete the user!
    await db.user.delete({
      where: { id: user.id },
    });

    return { success: true };
  } catch (error) {
    console.error("Delete account error:", error);
    return {
      error: "Failed to delete account database records.",
    };
  }
}
