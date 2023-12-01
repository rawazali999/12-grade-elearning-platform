import User from "@/models/user";
import Progress from "@/models/progress";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";

export async function DELETE(req) {
  const { userId } = await req.json();
//   console.log("Request body:", userId);
  await connectMongoDB();
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return NextResponse.error(new Error("User not found"));
  }
  await User.deleteOne({ _id: userId });
  await Progress.deleteMany({ userId });
  return NextResponse.json({ message: "User deleted" });
}
