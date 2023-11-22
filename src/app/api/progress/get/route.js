import Progress from "@models/progress";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { userEmail, subject, id, lessons } = await req.json();

    // Check if progress exists
    let progress = await Progress.findOne({ userEmail, subject, id });

    if (progress) {
      return NextResponse.json(progress.lessons);
      // If progress doesn't exist, create it asynchronously
    } else {
      const progress = await Progress.create({
        userEmail,
        id,
        subject,
        lessons,
      });
      return NextResponse.json(progress.lessons);
    }

    // Return the lessons of the progress
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
