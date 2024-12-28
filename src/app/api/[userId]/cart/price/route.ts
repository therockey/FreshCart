import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const response = {
    priceAfterDiscount: 100,
    discount: 20,
    freeDelivery: true,
  };

  return Response.json(response);
}
