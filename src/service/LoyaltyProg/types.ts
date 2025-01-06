import { LoyaltyProgramSettings as DbLoyaltyProgramSettings } from "@prisma/client";
import { LoyaltyProgramStats as DbLoyaltyProgramStats } from "@prisma/client";
import { Order } from "../Order/types";

export type LoyaltyProgramSettingsType = DbLoyaltyProgramSettings;
export type LoyaltyProgramSettingsKey = keyof LoyaltyProgramSettingsType;

export type LoyaltyProgramStatsType = DbLoyaltyProgramStats;
export type LoyaltyProgramStatsKeys = LoyaltyProgramStatsType;
export type LoyaltyProg = {
  settings: LoyaltyProgramSettingsType | null;
  stats: LoyaltyProgramStatsType | null;
};

export interface LoyaltyProgPage {
  loyaltyProgStats: LoyaltyProgramStatsType;
  orderHistory: Order[];
}
