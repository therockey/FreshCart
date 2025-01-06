import { Cart } from "./Cart/types";

export const calculateUserCartTotal = (cart: Cart) => {
  if (!cart) return 0;
  return cart.reduce((sum, cartItem) => {
    return sum + cartItem.product.price * cartItem.quantity;
  }, 0);
};

export const calculateDiscount = (
  initialPrice: number,
  pointsToSpend: number,
  threshold: number
) => {
  if (pointsToSpend < threshold || initialPrice < 50)
    return { price: initialPrice, discount: 0 };
  const discount = Math.floor(pointsToSpend / 100) * 10;

  return { price: Math.min(discount, initialPrice), discount };
};
