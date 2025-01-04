import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getUserLpSettings = async (userId: number) => {
  const clientCart = await prisma.client.findUnique({
    where: {
      fk_system_user_id: userId,
    },
    include: { LoyaltyProgramSettings: true },
  });

  return clientCart?.LoyaltyProgramSettings;
};

export type UserLpSettingsType = Prisma.PromiseReturnType<
  typeof getUserLpSettings
>;

export type UserLpSettingsKeys = keyof NonNullable<UserLpSettingsType>;

export const getUserLpStats = async (userId: number) => {
  const clientCart = await prisma.client.findUnique({
    where: {
      fk_system_user_id: userId,
    },
    include: { LoyaltyProgramStats: true },
  });
  return clientCart?.LoyaltyProgramStats;
};

export type UserStatsLpType = Prisma.PromiseReturnType<typeof getUserLpStats>;
export type UserLpStatsKeys = keyof NonNullable<UserStatsLpType>;

export const updateUserLpSettings = async (
  userId: number,
  data: UserLpSettingsType
) =>
  prisma.client.update({
    where: {
      fk_system_user_id: userId,
    },
    data: {
      LoyaltyProgramSettings: {
        update: { ...data },
      },
    },
  });
