import { prisma } from "@/lib/prisma";
import { Order, ORDER_STATUS, PAYMENT_METHOD } from "@prisma/client";
import { getCartWithPrice } from "../Cart";
export const getUserOrderHistory = async (
  userId: number
): Promise<Order[] | null> => {
  const orders = await prisma.client.findUnique({
    where: {
      fk_system_user_id: userId,
    },
    include: { Order: true },
  });
  return orders?.Order ?? null;
};

export const placeOrder = async (
  userId: number,
  body: { address: string }
): Promise<Order | null> => {
  try {
    const cartData = await getCartWithPrice(userId);
    if (!cartData) throw new Error("Cart is empty");
    const { totalPrice, _ } = cartData;
    const { address } = body;
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

    const order = await prisma.order.create({ data: orderData });

    return order;
  } catch (error) {
    console.error("Error placing order:", error);
    return null;
  }
};
