import { withAPIHandler } from "./utils/withAPIHandler";
import { FetchBuilder } from "./utils/FetchBuilder";
import defaultMapper from "./responseMappers/defaultMapper";
import { CartWithPrice } from "@/service/Cart/types";
import { Order, OrderHistory } from "@/service/Order/types";
import {
  LoyaltyProgPage,
  LoyaltyProgramSettingsType,
} from "@/service/LoyaltyProg/types";
import { LoyaltyProgramSettings } from "@prisma/client";
export const getCart = (customerId: number) =>
  withAPIHandler<CartWithPrice>(
    new FetchBuilder(`/api/${customerId}/cart`),
    defaultMapper
  );

export const getLoyaltyProgPage = (customerId: number) =>
  withAPIHandler<LoyaltyProgPage>(
    new FetchBuilder(`/api/${customerId}/loyaltyProg/stats`),
    defaultMapper
  );

export const getLoyaltyProgSettings = (customerId: number) =>
  withAPIHandler<LoyaltyProgramSettings>(
    new FetchBuilder(`/api/${customerId}/loyaltyProg`),
    defaultMapper
  );

export const updateLoyaltyProg = (
  customerId: number,
  loyaltyProgSettings: LoyaltyProgramSettingsType
) =>
  withAPIHandler<LoyaltyProgramSettingsType>(
    new FetchBuilder(`/api/${customerId}/loyaltyProg`)
      .setMethod("PUT")
      .setHeaders({ "Content-Type": "application/json" })
      .setBody(loyaltyProgSettings),
    defaultMapper
  );

export const getOrderHistory = (customerId: number) =>
  withAPIHandler<OrderHistory>(
    new FetchBuilder(`/api/${customerId}/order/history`),
    defaultMapper
  );

export const placeOrder = (customerId: number, address: string) =>
  withAPIHandler<Order>(
    new FetchBuilder(`/api/${customerId}/order`)
      .setMethod("POST")
      .setHeaders({ "Content-Type": "application/json" })
      .setBody({ address }),
    defaultMapper
  );
