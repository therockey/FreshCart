import { placeOrder } from "@/service/Order";
import { createApiHandler, extractUserId } from "@/utils/ApiHandling";

export const POST = createApiHandler<
  { userId: string },
  { address: string },
  { userId: number; body: { address: string } }
>({
  methodName: "POST: /[userId]/order",
  extractParams: extractUserId,
  extractBody: (body) => ({ body }),
  fetchData: async ({ userId, body }) => await placeOrder(userId, body),
  notFoundMessage: "Failed to post order.",
});
