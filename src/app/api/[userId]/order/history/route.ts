import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const orderHistory = {
    orderHistory: [
      {
        id: "1",
        price: 100,
        date: new Date(),
      },
      {
        id: "2",
        price: 200,
        date: new Date(),
      },
      {
        id: "3",
        price: 200,
        date: new Date(),
      },
    ],
  };

  return Response.json(orderHistory);
}
