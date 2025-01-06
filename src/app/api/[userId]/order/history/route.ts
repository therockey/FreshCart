import { getUserOrderHistory } from "@/service/Order";
import { createApiHandler, extractUserId } from "@/utils/ApiHandling";

export const GET = createApiHandler<
  { userId: string }, // Params type
  never, // Body type
  { userId: number } // Combined args type
>({
  methodName: "GET: /[userId]/order/history",
  extractParams: extractUserId,
  fetchData: async ({ userId }) => await getUserOrderHistory(userId),
  notFoundMessage: "Loyalty program stats not found for the given userId.",
});
