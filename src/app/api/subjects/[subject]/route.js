import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const { subject } = await req.json();
  // console.log(subject);

  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "subjects",
    `${subject}.json`,
  );

  let data;

  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Error reading file: ${filePath}`);
    return NextResponse.error("Internal Server Error", 500);
  }

  return NextResponse.json(data);
}
