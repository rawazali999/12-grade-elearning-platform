import Progress from "@models/progress";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { userEmail, subject, courseId, lessons } = await req.json();

    let progress = await Progress.findOne({ userEmail, subject, courseId });

    if (!progress) {
      progress = await Progress.create({
        userEmail,
        courseId,
        subject,
        lessons,
      });
    }

    if (!progress.lessons) {
      console.log('progress.lessons is undefined');
      return NextResponse.json({ error: 'progress.lessons is undefined' });
    }

    return NextResponse.json(progress.lessons);
  } catch (error) {
    console.log('Error in POST function:', error);
    return NextResponse.json({ error: error.message });
  }
}