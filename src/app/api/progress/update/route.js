import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import Progress from "@models/progress";

export async function PUT(req) {
  await connectMongoDB();
  const { userEmail, id, subject, lesson } = await req.json();
  // console.log("Request body:", userEmail, id, subject, lesson);
  const progress = await Progress.findOne({ userEmail, id, subject });
  // console.log("Progress found for update:", progress);
  const lessonIndex = progress.lessons.findIndex((l) => l.id === lesson.id);
  console.log("Lesson index:", lessonIndex);

  await Progress.updateOne(
    { userEmail: progress.userEmail, id: progress.id, subject: subject },
    { $set: { [`lessons.${lessonIndex}.checked`]: lesson.checked } },
  );

  return NextResponse.json({ message: "Progress updated" });
}
