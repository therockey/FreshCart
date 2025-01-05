import { prisma } from "@/lib/prisma";
import { Product as DbProduct } from "@prisma/client";
import {getDepots} from "@/service/Depot";
import {createProductStock} from "@/service/Stock";

export const getProducts = async () => {
    return prisma.product.findMany();
}

export const getProduct = async (productId: number) => {
    return prisma.product.findUnique({
        where: {
            id: productId,
        }
    });
}

export const addProduct = async (product: NewProductDTO) => {
    const newProduct = await prisma.product.create({
        data: {
            ...product,
            created_at: new Date(),
        }
    });

    const depots = await getDepots();
    for (const depot of depots) {
        await createProductStock(newProduct.id, depot.id, 0);
    }

    return newProduct;
}

type NewProductDTO = Omit<DbProduct, "id" | "created_at">;

export { type DbProduct as Product };
export { type NewProductDTO as NewProductDTO };
