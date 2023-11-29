import { connectMongoDB } from "@lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const userId = await User.findOne({ email }).select("_id");
    // console.log("userid: ", userId);
    return NextResponse.json(userId);
  } catch (error) {
    console.log(error);
  }
}
