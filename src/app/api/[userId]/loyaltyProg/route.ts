import {
  getUserLoyaltyProgSettings,
  updateUserLoyaltyProgSettings,
} from "@/service/LoyaltyProg";
import { LoyaltyProgramSettingsType } from "@/service/LoyaltyProg/types";
import { createApiHandler, extractUserId } from "@/utils/ApiHandling";

export const GET = createApiHandler<
  { userId: string },
  never,
  { userId: number }
>({
  methodName: "GET: /[userId]/loyaltyProg",
  extractParams: extractUserId,
  fetchData: async ({ userId }) => await getUserLoyaltyProgSettings(userId),
  notFoundMessage: "Loyalty program settings not found for the given userId.",
});

export const PUT = createApiHandler<
  { userId: string },
  LoyaltyProgramSettingsType,
  { userId: number; body: LoyaltyProgramSettingsType }
>({
  methodName: "PUT: /[userId]/loyaltyProg",
  extractParams: extractUserId,
  extractBody: (body) => {
    return { body } as Partial<{ body: LoyaltyProgramSettingsType }>;
  },
  fetchData: async ({ userId, body }) =>
    await updateUserLoyaltyProgSettings(userId, body),
  notFoundMessage: "Failed to update loyalty program settings.",
});
