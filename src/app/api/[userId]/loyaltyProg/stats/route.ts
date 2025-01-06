import { getUserLoyaltyProgStats } from "@/service/LoyaltyProg";
import { getUserOrderHistory } from "@/service/Order";
import { createApiHandler, extractUserId } from "@/utils/ApiHandling";

export const GET = createApiHandler<
  { userId: string }, // Params type
  never, // Body type
  { userId: number } // Combined args type
>({
  methodName: "GET: /[userId]/loyaltyProg/stats",
  extractParams: extractUserId,
  fetchData: async ({ userId }) => {
    const [loyaltyProgStats, orderHistory] = await Promise.all([
      getUserLoyaltyProgStats(userId),
      getUserOrderHistory(userId),
    ]);
    if (!loyaltyProgStats && !orderHistory) return null;
    return { loyaltyProgStats, orderHistory };
  },
  notFoundMessage: "Loyalty program stats not found for the given userId.",
});
