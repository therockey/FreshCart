import { prisma } from "@/lib/prisma";
import { ORDER_STATUS, PAYMENT_METHOD, Prisma } from "@prisma/client";
import { getCartWithPrice } from "./Cart";
import { Order } from "@prisma/client";
export { type Order as OrderType };
export const getUserOrderHistory = async (userId: number) => {
  const orders = await prisma.client.findUnique({
    where: {
      fk_system_user_id: userId,
    },
    include: { Order: true },
  });
  return orders?.Order;
};

export type UserOrderHistory = Prisma.PromiseReturnType<
  typeof getUserOrderHistory
>;

export const placeOrder = async (userId: number, address: string) => {
  try {
    // Step 1: Fetch cart details
    const cartData = await getCartWithPrice(userId);

    if (!cartData) {
      throw new Error(
        "Failed to calculate cart price. Received null or undefined."
      );
    }

    const { totalPrice, cart } = cartData;

    if (!cart)
      throw new Error(
        "Failed to calculate cart price. Received null or undefined."
      );

    const orderData = {
      fk_client_id: userId,
      created_at: new Date(),
      address: address,
      price: parseFloat(totalPrice.toFixed(2)),
      status: ORDER_STATUS.awaiting, // Use the enum
      loyaltyPointsGained: Math.floor(totalPrice / 10),
      freeDelivery: totalPrice > 100, // Example logic
      payment_method: PAYMENT_METHOD.Visa,
    };

    // Step 5: Create the order in Prisma
    const order = await prisma.order.create({ data: orderData });

    return order;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error; // Rethrow to maintain stack trace
  }
};
