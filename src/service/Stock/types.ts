import { Prisma, ProductStock as DbStock } from "@prisma/client";
import { getProductStock } from "./Stock";
type UpdateStockDTO = Omit<DbStock, "id" | "updated_at">;

export { type DbStock as ProductStock };
export { type UpdateStockDTO as UpdateStockDTO };
export type GetProductStockType = Prisma.PromiseReturnType<
  typeof getProductStock
>;
