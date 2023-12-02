import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  await connectMongoDB();

  const { userId, newPassword } = await req.json();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password in the database
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { password: hashedPassword },
    { new: true },
  );
  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }
  return NextResponse.json({ message: "Password updated" });
}
