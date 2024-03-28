import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  return NextResponse.json({
    status: 200,
    message: "YES",
  });
}