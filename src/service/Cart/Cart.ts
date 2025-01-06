import { prisma } from "@/lib/prisma";
import { Cart, CartWithPrice } from "./types";
import {
  getUserLoyaltyProgSettings,
  getUserLoyaltyProgStats,
} from "../LoyaltyProg";
import { calculateDiscount, calculateUserCartTotal } from "../utils";

export const getUserCart = async (userId: number): Promise<Cart | null> => {
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
};

export const getCartWithPrice = async (
  userId: number
): Promise<CartWithPrice | null> => {
  const cart = await getUserCart(userId);
  if (!cart || cart.length === 0) {
    return null;
  }

  let totalPrice = calculateUserCartTotal(cart);
  const loyaltySettings = await getUserLoyaltyProgSettings(userId);

  const loyaltyStats = await getUserLoyaltyProgStats(userId);

  if (!loyaltySettings || !loyaltyStats) return null;

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
    };
  }

  return {
    totalPrice,
    discount: 0,
    gainedPoints: 0,
    cart,
  };
};
