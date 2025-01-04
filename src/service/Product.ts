import { prisma } from "@/lib/prisma";
import { Product as DbProduct } from "@prisma/client";

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
    console.log(product);
    return prisma.product.create({
        data: {
            ...product,
            created_at: new Date(),
        }
    });
}

type NewProductDTO = Omit<DbProduct, "id" | "created_at">;

export { type DbProduct as Product };
export { type NewProductDTO as NewProductDTO };
