import { Order as DbOrder } from "@prisma/client";
export type Order = DbOrder;
export type OrderHistory = Order[];
