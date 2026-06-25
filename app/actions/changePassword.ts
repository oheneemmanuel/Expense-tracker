"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import bcrypt from "bcryptjs";

export async function changePassword({
  currentPassword,
  newPassword,
  confirmPassword,
}: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  if (!currentPassword || !newPassword || !confirmPassword) {
    return {
      error: "All fields are required",
    };
  }

  if (newPassword.length < 8) {
    return {
      error: "Password must be at least 8 characters",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    return {
      error: "User not found",
    };
  }

  const passwordMatch = await bcrypt.compare(currentPassword, dbUser.password);

  if (!passwordMatch) {
    return {
      error: "Current password is incorrect",
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    success: "Password updated successfully",
  };
}
