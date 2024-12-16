import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const order = {
    products: [
      {
        name: "product1",
        price: 10,
      },
      {
        name: "product2",
        price: 20,
      },
    ],
    quantities: [1, 2],
  };

  return Response.json(order);
}
