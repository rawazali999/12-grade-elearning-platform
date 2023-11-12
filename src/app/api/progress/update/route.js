import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import Progress from "@models/progress";

export async function PUT(req) {
  await connectMongoDB();
  const { userEmail, courseId, subject, lessons } = await req.json();
  // console.log("Request body:", userEmail, courseId, subject, lessons);
  const progress = await Progress.findOne({ userEmail, courseId, subject });
  // console.log("Progress found for update:", progress);

  await Progress.updateOne(
    { userEmail: progress.userEmail, courseId: courseId, subject: subject },
    { lessons },
  );

  return NextResponse.json({ message: "Progress updated" });
}
