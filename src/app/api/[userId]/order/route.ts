import { placeOrder } from "@/service";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const req = await request.json();
  const res = await placeOrder(parseInt(userId), req.address);

  return Response.json(res);
}
