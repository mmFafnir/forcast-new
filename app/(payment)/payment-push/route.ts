import { getQueryParameters } from "@/shared/helper/getQueryParameters";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await axios.post(
      "https://admin.aibetguru.com/api/payment-push",
      getQueryParameters(request.url)
    );
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    status: 200,
    message: "YES",
  });
}

export async function GET(request: Request) {
  try {
    await axios.post(
      "https://admin.aibetguru.com/api/payment-push",
      getQueryParameters(request.url)
    );
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({
    status: 200,
    message: "YES",
  });
}
