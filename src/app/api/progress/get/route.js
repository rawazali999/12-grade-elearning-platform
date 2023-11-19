import Progress from "@models/progress";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { userEmail, subject, id, lessons } = await req.json();
    // console.log(userEmail, subject, id, lessons);

    let progress = await Progress.findOne({ userEmail, subject, id });

    if (!progress) {
      progress = await Progress.create({
        userEmail,
        id,
        subject,
        lessons,
      });
    }
    return NextResponse.json(progress.lessons);
  } catch (error) {
    console.log("Error in POST function:", error);
    return NextResponse.json({ error: error.message });
  }
}
