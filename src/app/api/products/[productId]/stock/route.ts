import { NextRequest } from "next/server";
import { getAllProductStocks } from "@/service/Stock/Stock";
import { createApiHandler } from "@/utils/ApiHandling";

export const GET = createApiHandler<
  { productId: string },
  never,
  { productId: number }
>({
  methodName: "GET: /products/[productId]/stock",
  extractParams: ({ productId }) => ({ productId: parseInt(productId) }),
  fetchData: async ({ productId }) => await getAllProductStocks(productId),
  notFoundMessage: "Failed to find product stock",
});
