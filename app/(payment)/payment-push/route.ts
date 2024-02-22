export async function POST(req: Request) {
  return Response.json({
    status: 200,
    message: "I received messages from you",
  });
}
