import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getUserCart = async (userId: number) => {
  const clientCart = await prisma.client.findUnique({
    where: {
      fk_system_user_id: userId,
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

  return clientCart?.Cart?.CartProducts;
};

export type UserCartType = Prisma.PromiseReturnType<typeof getUserCart>;
