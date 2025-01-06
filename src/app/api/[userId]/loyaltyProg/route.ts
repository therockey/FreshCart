import { getUserLoyaltyProgSettings, updateUserLpSettings } from "@/service";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const data = await getUserLoyaltyProgSettings(parseInt(userId));

  return Response.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const res = await request.json();
  const { userId } = await params;
  const data = await updateUserLpSettings(parseInt(userId), res);
  return Response.json(data);
}
