import {Prisma, ProductStock as DbStock} from "@prisma/client";
import {prisma} from "@/lib/prisma";

export const getProductStock = async (productId: number, depotId: number) => {
    console.log("getProductStock", productId, depotId);
    return prisma.productStock.findFirst({
        where: {
            fk_product_id: productId,
            fk_depot_id: depotId,
        },
        include: {
            Depot: true,
        }
    });
}

export const getAllProductStocks = async (productId: number) => {
    return prisma.productStock.findMany({
        where: {
            fk_product_id: productId,
        },
        include: {
            Depot: true,
        }
    });
}

export const updateProductStock = async (productId: number, depotId: number, quantity: number) => {
    return prisma.productStock.update({
        where: {
            fk_product_id_fk_depot_id: {
                fk_product_id: productId,
                fk_depot_id: depotId,
            },
        },
        data: {
            quantity,
        },
    });
}

type UpdateStockDTO = Omit<DbStock, "id" | "updated_at">;

export {type DbStock as ProductStock};
export {type UpdateStockDTO as UpdateStockDTO};
export type GetProductStockType = Prisma.PromiseReturnType<typeof getProductStock>;