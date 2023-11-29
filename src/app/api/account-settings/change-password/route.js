import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";
let db;
export async function PUT(req) {
  if (!db) {
    db = await connectMongoDB();
  }

  const { userEmail } = await req.json();

  const user = await User.findOneAndUpdate({ email: userEmail });
  if (!user) {
    return NextResponse.json({ error: "Password found" });
  }

  return NextResponse.json({ message: "Password updated" });
}
