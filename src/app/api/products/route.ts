import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const products = [
    {
        id: 1,
      name: "product1",
      price: 10,
    },
    {
        id: 2,
      name: "product2",
      price: 20,
    },
  ];

  return Response.json(products);
}

export async function POST(request: NextRequest) {
  return Response.json({ message: "Product created" });
}