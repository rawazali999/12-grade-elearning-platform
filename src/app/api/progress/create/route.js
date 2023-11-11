import Progress from "@models/progress";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";

export async function POST(req) {
  await connectMongoDB();
  const { userEmail, courseId, subject, lessons } = await req.json();

  const progress = await Progress.create({
    userEmail,
    courseId,
    subject,
    lessons,
  });

  return NextResponse.json(progress.lessons);
}