import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const order = {
    order: "sad",
  };

  return Response.json(order);
}
