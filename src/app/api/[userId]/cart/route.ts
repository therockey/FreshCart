import { getCartWithPrice } from "@/service/Cart";
import { createApiHandler, extractUserId } from "@/utils/ApiHandling";

export const GET = createApiHandler<
  { userId: string },
  never,
  { userId: number }
>({
  methodName: "GET: /[userId]/cart",
  extractParams: extractUserId,
  fetchData: async ({ userId }) => await getCartWithPrice(userId),
  notFoundMessage: "CartPrice not found for the given userId.",
});
