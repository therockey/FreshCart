import {Depot, GetProductStockType, NewProductDTO, Product, ProductStock, UpdateStockDTO} from "@/service";
import { withAPIHandler } from "./utils/withAPIHandler";
import { FetchBuilder } from "./utils/FetchBuilder";
import defaultMapper from "./responseMappers/defaultMapper";

export const getProducts =
  withAPIHandler<Product[]>(
    new FetchBuilder(`/api/products`),
    defaultMapper
  );

export const getProduct = (productId: string) =>
    withAPIHandler<Product>(
        new FetchBuilder(`/api/products/${productId}`),
        defaultMapper
    );

export const getDepots =
  withAPIHandler<Depot[]>(
    new FetchBuilder(`/api/depots`),
    defaultMapper
  );

export const createProduct = (product: NewProductDTO) =>
  withAPIHandler<NewProductDTO>(
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

export const updateProductStock = (stock: UpdateStockDTO) =>
  withAPIHandler<UpdateStockDTO>(
    new FetchBuilder(`/api/products/${stock.fk_product_id}/stock/${stock.fk_depot_id}`)
      .setMethod("PUT")
      .setHeaders({ "Content-Type": "application/json" })
      .setBody({
          quantity: stock.quantity
      }),
    defaultMapper
  );

export const getStock = (productId: string, depotId: string) =>
    withAPIHandler<GetProductStockType>(
        new FetchBuilder(`/api/products/${productId}/stock/${depotId}`),
        defaultMapper
    );

export const getStocks = (productId: string) =>
    withAPIHandler<GetProductStockType[]>(
        new FetchBuilder(`/api/products/${productId}/stock`),
        defaultMapper
    );
