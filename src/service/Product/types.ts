import { Product as DbProduct } from "@prisma/client";

export type NewProductDTO = Omit<DbProduct, "id" | "created_at">;
export type Product = DbProduct;
export { PRODUCT_CATEGORY as ProductCategory } from "@prisma/client";
