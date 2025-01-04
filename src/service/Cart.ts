import { prisma } from "@/lib/prisma";
import { Prisma, Product } from "@prisma/client";
import { getUserLpSettings, getUserLpStats } from "./LoyaltyProg";
import { calculateDiscount, calculateUserCartTotal } from "./utils";

export type UserCartType = Prisma.PromiseReturnType<typeof getUserCart>;
export type CartWithPrice = {
  totalPrice: number;
  discount: number;
  gainedPoints: number;
  cart: UserCartType | null;
};
type Cart = { product: Product; quantity: number }[];

export const getUserCart = async (userId: number): Promise<Cart | null> => {
  try {
    const clientCart = await prisma.client.findUnique({
      where: { fk_system_user_id: userId },
      include: {
        Cart: {
          include: {
            CartProducts: {
              include: { Product: true },
            },
          },
        },
      },
    });

    if (
      !clientCart ||
      !clientCart.Cart ||
      !clientCart.Cart.CartProducts?.length
    ) {
      return null;
    }

    return clientCart.Cart.CartProducts.map((item) => ({
      product: item.Product,
      quantity: item.quantity,
    }));
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCartWithPrice = async (userId: number) => {
  const cart = await getUserCart(userId);
  if (!cart || cart.length === 0) {
    return null;
  }

  let totalPrice = calculateUserCartTotal(cart);
  const loyaltySettings = await getUserLpSettings(userId).catch((error) => {
    console.error("Error fetching loyalty settings:", error);
    throw new Error("Unable to fetch loyalty settings.");
  });

  const loyaltyStats = await getUserLpStats(userId).catch((error) => {
    console.error("Error fetching loyalty stats:", error);
    throw new Error("Unable to fetch loyalty stats.");
  });

  if (loyaltySettings?.is_active && loyaltyStats) {
    const { price, discount } = calculateDiscount(
      totalPrice,
      loyaltyStats.current_pts ?? 0,
      loyaltySettings.point_threshold ?? 0
    );
    totalPrice = price - discount;

    return {
      totalPrice,
      discount,
      gainedPoints: loyaltyStats.current_pts ?? 0,
      cart,
    } as CartWithPrice;
  }

  return {
    totalPrice,
    discount: 0,
    gainedPoints: 0,
    cart,
  } as CartWithPrice;
};
