import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const { subject } = await req.json();

  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
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
