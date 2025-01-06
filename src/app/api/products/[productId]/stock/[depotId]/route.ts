import { getProductStock, updateProductStock } from "@/service/Stock/Stock";
import { createApiHandler } from "@/utils/ApiHandling";

export const GET = createApiHandler<
  { productId: string; depotId: string },
  never,
  { productId: number; depotId: number }
>({
  methodName: "GET: /products/[productId]/stock/[depotId]",
  extractParams: ({ productId, depotId }) => ({
    productId: parseInt(productId),
    depotId: parseInt(depotId),
  }),
  fetchData: async ({ productId, depotId }) =>
    await await getProductStock(productId, depotId),
  notFoundMessage: "Failed to find stock",
});

interface PutBody {
  quantity: number;
}
export const PUT = createApiHandler<
  { productId: string; depotId: string },
  PutBody,
  { productId: number; depotId: number; body: PutBody }
>({
  methodName: "PUT: /products/[productId]/stock/[depotId]",
  extractParams: ({ productId, depotId }) => ({
    productId: parseInt(productId),
    depotId: parseInt(depotId),
  }),
  extractBody: (body) => ({ body }),
  fetchData: async ({ productId, depotId, body }) =>
    await await updateProductStock(productId, depotId, body.quantity),
  notFoundMessage: "Failed to put stock",
});
