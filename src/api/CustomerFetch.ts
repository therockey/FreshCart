import { withAPIHandler } from "./utils/withAPIHandler";
import { FetchBuilder } from "./utils/FetchBuilder";
import defaultMapper from "./responseMappers/defaultMapper";
import {
  CartWithPrice,
  LoyaltyProgramSettingsType,
  UserOrderHistory,
  UserStatsLpType,
} from "@/service";

export const getCart = (customerId: string) =>
  withAPIHandler<CartWithPrice>(
    new FetchBuilder(`/api/${customerId}/cart`),
    defaultMapper
  );

export const getLoyaltyProgStats = (customerId: string) =>
  withAPIHandler<UserStatsLpType>(
    new FetchBuilder(`/api/${customerId}/loyaltyProg/stats`),
    defaultMapper
  );

export const getLoyaltyProg = (customerId: string) =>
  withAPIHandler<LoyaltyProgramSettingsType>(
    new FetchBuilder(`/api/${customerId}/loyaltyProg`),
    defaultMapper
  );

export const updateLoyaltyProg = (
  customerId: string,
  loyaltyProgSettings: LoyaltyProgramSettingsType
) =>
  withAPIHandler<LoyaltyProgramSettingsType>(
    new FetchBuilder(`/api/${customerId}/loyaltyProg`)
      .setMethod("PUT")
      .setHeaders({ "Content-Type": "application/json" })
      .setBody(loyaltyProgSettings),
    defaultMapper
  );

export const getOrderHistory = (customerId: string) =>
  withAPIHandler<UserOrderHistory>(
    new FetchBuilder(`/api/${customerId}/order/history`),
    defaultMapper
  );

export const placeOrder = (customerId: string, address: string) =>
  withAPIHandler<UserOrderHistory>(
    new FetchBuilder(`/api/${customerId}/order`)
      .setMethod("POST")
      .setHeaders({ "Content-Type": "application/json" })
      .setBody({ address }),
    defaultMapper
  );
