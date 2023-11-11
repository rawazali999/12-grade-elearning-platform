import Progress from "@models/progress";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";

export async function POST(req) {
  await connectMongoDB();
  const { userEmail, courseId, subject } = await req.json();

  const progress = await Progress.findOne({ userEmail, courseId, subject });

  return NextResponse.json(progress.lessons);
}
