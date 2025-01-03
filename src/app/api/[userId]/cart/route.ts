import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
// const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const clientId = 1; // Replace with the desired client ID

  const clientCart = await prisma.client.findUnique({
    where: {
      fk_system_user_id: clientId,
    },
    include: {
      Cart: {
        include: {
          CartProducts: {
            include: {
              Product: true,
            },
          },
        },
      },
    },
  });

  console.log(clientCart?.Cart?.CartProducts);
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
