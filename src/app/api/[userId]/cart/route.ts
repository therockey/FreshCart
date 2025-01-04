import { NextRequest } from "next/server";
import { calculcateCartPrice, getUserCart } from "@/service";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const cartPrice = await calculcateCartPrice(parseInt(userId));

  return Response.json(cartPrice);
}
