import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const paramsValue = await params;
  console.log(paramsValue);
  const loyaltyProgStats = {
    totalPoints: 100,
    currentPoints: 2031,
    savedMoney: 100,
  };

  return Response.json(loyaltyProgStats);
}
