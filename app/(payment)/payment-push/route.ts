import { getQueryParameters } from "@/shared/helper/getQueryParameters";
import axios from "axios";
import { NextApiRequest } from "next";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import requestIp from "request-ip";

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

export async function GET(request: NextRequest) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");
  // try {
  //   await axios.post(
  //     "https://admin.aibetguru.com/api/payment-push",
  //     getQueryParameters(request.url)
  //   );
  // } catch (error) {
  //   // console.log('error', error);
  // }

  console.log("ip", ip);

  return NextResponse.json({
    status: 200,
    message: "YES",
    ip: ip,
  });
}
