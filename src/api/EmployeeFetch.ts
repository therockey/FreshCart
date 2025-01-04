import { Product } from "@/service";
import { Depot } from "@/types/Depot";
import { withAPIHandler } from "./utils/withAPIHandler";
import { FetchBuilder } from "./utils/FetchBuilder";
import defaultMapper from "./responseMappers/defaultMapper";

export const getProducts =
  withAPIHandler<Product[]>(
    new FetchBuilder(`/api/products`),
    defaultMapper
  );

export const getDepots =
  withAPIHandler<Depot[]>(
    new FetchBuilder(`/api/depots`),
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

export const deleteProduct = (productId: string) =>
  withAPIHandler<Product>(
    new FetchBuilder(`/api/products/${productId}`)
      .setMethod("DELETE"),
    defaultMapper
  );

export const updateProductStock = (productId: string, depotId: string, stock: number) =>
  withAPIHandler<Product>(
    new FetchBuilder(`/api/products/${productId}/stock`)
      .setMethod("PUT")
      .setHeaders({ "Content-Type": "application/json" })
      .setBody({ "depot": depotId, "stock": stock }),
    defaultMapper
  );
