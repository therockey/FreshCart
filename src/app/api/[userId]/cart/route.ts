import { NextRequest } from "next/server";
import { getUserCart } from "@/service";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const data = await getUserCart(parseInt(userId));
  console.log(data);
  return Response.json(data);
}
