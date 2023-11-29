import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import Progress from "@models/progress";
let db;
export async function PUT(req) {
  if (!db) {
    db = await connectMongoDB();
    console.log(db);
  }
  const { userId, courseId, subject, lesson } = await req.json();
  // console.log("Request body:", userId, id, subject, lesson);
  const progress = await Progress.findOne({ userId, courseId, subject });
  // console.log("Progress found for update:", progress);
  const lessonIndex = progress.lessons.findIndex((l) => l.id == lesson.id);
  console.log("Lesson index:", lessonIndex);

  await Progress.updateOne(
    { userId: progress.userId, courseId: progress.courseId, subject: subject },
    { $set: { [`lessons.${lessonIndex}.checked`]: lesson.checked } },
  );

  return NextResponse.json({ message: "Progress updated" });
}
