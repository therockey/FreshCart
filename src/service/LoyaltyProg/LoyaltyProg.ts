import { prisma } from "@/lib/prisma";
import {
  LoyaltyProg,
  LoyaltyProgramSettingsType,
  LoyaltyProgramStatsKeys,
} from "./types";

export const getUserLoyaltyProgSettings = async (
  userId: number
): Promise<LoyaltyProgramSettingsType | null> => {
  const clientCart = await prisma.client.findUnique({
    where: {
      fk_system_user_id: userId,
    },
    include: { LoyaltyProgramSettings: true },
  });

  return clientCart?.LoyaltyProgramSettings ?? null;
};

export const updateUserLoyaltyProgSettings = async (
  userId: number,
  data: LoyaltyProgramSettingsType
): Promise<LoyaltyProgramSettingsType | null> => {
  try {
    await prisma.client.update({
      where: {
        fk_system_user_id: userId,
      },
      data: {
        LoyaltyProgramSettings: {
          update: data,
        },
      },
    });
    return data;
  } catch (e) {
    console.error("Failed to update LoyaltyProgramSettings:", e);
    return null;
  }
};

export const getUserLoyaltyProgStats = async (
  userId: number
): Promise<LoyaltyProgramStatsKeys | null> => {
  const clientCart = await prisma.client.findUnique({
    where: {
      fk_system_user_id: userId,
    },
    include: { LoyaltyProgramStats: true },
  });
  return clientCart?.LoyaltyProgramStats ?? null;
};

export const getUserLoyaltyProg = async (
  userId: number
): Promise<LoyaltyProg> => {
  const clientCart = await prisma.client.findUnique({
    where: {
      fk_system_user_id: userId,
    },
    include: {
      LoyaltyProgramSettings: true,
      LoyaltyProgramStats: true,
    },
  });
  return {
    settings: clientCart?.LoyaltyProgramSettings ?? null,
    stats: clientCart?.LoyaltyProgramStats ?? null,
  };
};
