import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import Progress from "@models/progress";

export async function PUT(req) {
  await connectMongoDB();
  const { userEmail, courseId, subject, lesson } = await req.json();
  // console.log("Request body:", userEmail, courseId, subject, lessons);
  const progress = await Progress.findOne({ userEmail, courseId, subject });
  // console.log("Progress found for update:", progress);
  const lessonIndex = progress.lessons.findIndex(l => l.id === lesson.id);
  console.log("Lesson index:", lessonIndex);

  await Progress.updateOne(
    { userEmail: progress.userEmail, courseId: courseId, subject: subject },
    { $set: { [`lessons.${lessonIndex}.checked`]: lesson.checked } },
  ); 

  return NextResponse.json({ message: "Progress updated" });
}
