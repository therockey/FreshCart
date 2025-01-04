import { getUserOrderHistory } from "@/service/Order";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const data = await getUserOrderHistory(parseInt(userId));
  console.log(data);
  return Response.json(data);
}
