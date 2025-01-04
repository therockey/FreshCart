import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getUserLpSettings, getUserLpStats } from "./LoyaltyProg";
import { calculateDiscount, calculateUserCartTotal } from "./utils";

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
  return clientCart?.Cart?.CartProducts?.map((item) => ({
    product: item.Product,
    quantity: item.quantity,
  }));
};

export type UserCartType = Prisma.PromiseReturnType<typeof getUserCart>;

export const calculcateCartPrice = async (userId: number) => {
  const cart = await getUserCart(userId);
  if (!cart || cart.length === 0) {
    throw new Error("No items in cart to place an order.");
  }
  let totalPrice = calculateUserCartTotal(cart);
  const loyaltySettings = await getUserLpSettings(userId);
  const loyaltyStats = await getUserLpStats(userId);
  if (loyaltySettings && loyaltyStats && loyaltySettings.is_active) {
    const { price, discount } = calculateDiscount(
      totalPrice,
      loyaltyStats.current_pts ?? 0,
      loyaltySettings.point_threshold ?? 0
    );
    totalPrice = price - discount;
    return { totalPrice, discount, gainedPoints: 0, cart } as CartWithPrice;
  }
  return { totalPrice, discount: 0, gainedPoints: 0, cart } as CartWithPrice;
};

export type CartWithPrice = {
  totalPrice: number;
  discount: number;
  gainedPoints: number;
  cart: UserCartType;
};
