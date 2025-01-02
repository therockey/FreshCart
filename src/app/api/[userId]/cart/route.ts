import { testDbConnection } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const isConnected = await testDbConnection();
  const cart = {
    products: [
      {
        id: "1",
        name: "product1",
        price: 10,
      },
      {
        id: "2",
        name: "product2",
        price: 20,
      },
    ],
    quantities: [1, 2],
  };

  return Response.json(cart);
}
