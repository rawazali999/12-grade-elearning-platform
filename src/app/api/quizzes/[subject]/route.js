import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(req) {
  const { subject } = await req.json();

  let data;

  const filePath = `public/data/${subject}.json`;

  data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return NextResponse.json(data);
}
