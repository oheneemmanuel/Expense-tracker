"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function verifyAndResetPassword(
  email: string,
  newPassword: string,
) {
  try {
    // 1. Verify the account exists
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return { error: "Account with this email does not exist." };
    }

    // 2. Hash and update the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: "Password updated successfully!" };
  } catch (error) {
    console.error("Reset error:", error);
    return { error: "Something went wrong on the server." };
  }
}
