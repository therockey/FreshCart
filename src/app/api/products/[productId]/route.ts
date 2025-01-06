import { getProduct } from "@/service/Product";
import { createApiHandler } from "@/utils/ApiHandling";

export const GET = createApiHandler<
  { productId: string },
  never,
  { productId: number }
>({
  methodName: "GET: /products/[productId]",
  extractParams: ({ productId }) => ({ productId: parseInt(productId) }),
  fetchData: async ({ productId }) => await getProduct(productId),
  notFoundMessage: "Failed to find product",
});
