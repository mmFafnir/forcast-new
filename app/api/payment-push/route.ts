import type { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  return new Response("This is a new API route");
}
