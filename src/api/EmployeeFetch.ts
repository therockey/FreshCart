import { Product } from "@/types/Product";
import { withAPIHandler } from "./utils/withAPIHandler";
import { FetchBuilder } from "./utils/FetchBuilder";
import defaultMapper from "./responseMappers/defaultMapper";

export const getProducts = withAPIHandler<Product[]>(
  new FetchBuilder(`/api/products`),
  defaultMapper
);
export const createProduct = (product: Product) =>
  withAPIHandler<Product>(
    new FetchBuilder(`/api/products`)
      .setMethod("POST")
      .setHeaders({ "Content-Type": "application/json" })
      .setBody(product),
    defaultMapper
  );
