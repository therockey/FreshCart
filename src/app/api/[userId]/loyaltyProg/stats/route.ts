import { getUserLpStats } from "@/service";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const data = await getUserLpStats(parseInt(userId));

  return Response.json(data);
}
