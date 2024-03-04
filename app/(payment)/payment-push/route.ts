import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await axios.post("https://admin.aibetguru.com/api/payment-push", body);
  } catch (error) {}

  return NextResponse.json({
    status: 200,
    message: "YES",
  });
}
