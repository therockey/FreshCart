import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const loyaltyProg = {
    greedy: true,
    cumulateUntil: 100,
    useFreeDelivery: true,
    switchOffProg: false,
  };

  return Response.json(loyaltyProg);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const res = await request.json();
  console.log(res);
  return Response.json(res);
}
