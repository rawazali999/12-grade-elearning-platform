import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";
let db;
export async function PUT(req) {
  if (!db) {
    db = await connectMongoDB();
  }

  const { userEmail, userName, name, email } = await req.json();

  if (userName == name && userEmail == email) {
    return NextResponse.json({
      message: "nothing",
    });
  }

  if (userEmail === email) {
    await User.findOneAndUpdate(
      { email: userEmail },
      { name: name },
      { new: true },
    );
    return NextResponse.json({ message: "name updated" });
  }

  // Check if the new email already exists in the database
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return NextResponse.json({ error: "You cant change to that email" });
  } else {
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { name: name, email: email },
      { new: true },
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    return NextResponse.json({ message: "user updated" });
  }
}
