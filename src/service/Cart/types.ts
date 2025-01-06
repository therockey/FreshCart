import { Product } from "@prisma/client";

export type CartWithPrice = {
  totalPrice: number;
  discount: number;
  gainedPoints: number;
  cart: Cart | null;
};
export type Cart = { product: Product; quantity: number }[];
