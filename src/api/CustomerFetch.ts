import { Cart } from "@/types/Cart";
import { withAPIHandler } from "./utils/withAPIHandler";
import { FetchBuilder } from "./utils/FetchBuilder";
import defaultMapper from "./responseMappers/defaultMapper";
import { LoyaltyProgSettings } from "@/types/LoyaltyProgSettings";
import { OrderHistoryItem } from "@/types/OrderHistoryItem";

export const getCart = (customerId: string) =>
  withAPIHandler<Cart>(
    new FetchBuilder(`/api/${customerId}/cart`),
    defaultMapper
  );

export const getCartPrice = (customerId: string) =>
  withAPIHandler<CartPrice>(
    new FetchBuilder(`/api/${customerId}/cart/price`),
    defaultMapper
  );

export const getLoyaltyProgStats = (customerId: string) =>
  withAPIHandler<LoyaltyProgStats>(
    new FetchBuilder(`/api/${customerId}/loyaltyProg/stats`),
    defaultMapper
  );

export const getLoyaltyProg = (customerId: string) =>
  withAPIHandler<LoyaltyProgSettings>(
    new FetchBuilder(`/api/${customerId}/loyaltyProg`),
    defaultMapper
  );

export const updateLoyaltyProg = (
  customerId: string,
  loyaltyProgSettings: LoyaltyProgSettings
) =>
  withAPIHandler<LoyaltyProgSettings>(
    new FetchBuilder(`/api/${customerId}/loyaltyProg`)
      .setMethod("PUT")
      .setHeaders({ "Content-Type": "application/json" })
      .setBody(loyaltyProgSettings),
    defaultMapper
  );

export const getOrderHistory = (customerId: string) =>
  withAPIHandler<OrderHistoryItem[]>(
    new FetchBuilder(`/api/${customerId}/order/history`),
    (response) => response.orderHistory
  );
