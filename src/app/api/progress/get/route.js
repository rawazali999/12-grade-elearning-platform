import Progress from "@models/progress";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";

export async function POST(req) {
  try {
    await connectMongoDB();
    console.log("in get progress route");
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

    if (!progress.lessons) {
      console.log("progress.lessons is undefined");
      return NextResponse.json({ error: "progress.lessons is undefined" });
    }

    return NextResponse.json(progress.lessons);
  } catch (error) {
    console.log("Error in POST function:", error);
    return NextResponse.json({ error: error.message });
  }
}
