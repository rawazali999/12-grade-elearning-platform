import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";
let db;
export async function PUT(req) {
  if (!db) {
    db = await connectMongoDB();
  }

  const { userEmail, name, email } = await req.json();

  const user = await User.findOneAndUpdate(
    { email: userEmail },
    { name: name, email: email },
    { new: true },
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  return NextResponse.json({ message: "User updated", });
}
