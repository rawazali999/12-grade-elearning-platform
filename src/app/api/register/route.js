import { connectMongoDB } from "@lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log("name: ", name, "email: ", email, "password: ", password);
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    const user = await User.create({ name, email, password: hashedPassword });
    console.log("user: ", user);
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 },
    );
  }
}
