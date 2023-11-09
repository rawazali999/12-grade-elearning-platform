import { useSession } from "next-auth/react";
import Progress from "@models/progress";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import { IoMdReturnLeft } from "react-icons/io";

export async function POST(req) {
  await connectMongoDB();
  const { userEmail, courseId, subject, title, lessons } = await req.json();
  console.log(userEmail, courseId, subject, title, lessons);

  const progress = await Progress.findOne({ userEmail, courseId });

  if (progress) {
    return NextResponse.json(progress);
  } else {
    await Progress.create({
      userEmail,
      courseId,
      subject,
      title,
      lessons,
    });

    return NextResponse.json({ message: "Progress created" });
  }
}

export async function PUT(req) {
  await connectMongoDB();
  const { userEmail, courseId, lessons } = await req.json();
  const progress = await Progress.findOne({ courseId, userEmail });
  await Progress.updateOne(
    { userEmail: progress.userEmail, courseId: courseId },
    { lessons },
  );
  return NextResponse.json({ message: "Progress updated" });
}
