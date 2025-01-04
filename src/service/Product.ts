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
    const newProduct = await prisma.product.create({
        data: {
            ...product,
            created_at: new Date(),
        }
    });

    const depots = await prisma.depot.findMany();
    for (const depot of depots) {
        await prisma.productStock.create({
            data: {
                fk_product_id: newProduct.id,
                fk_depot_id: depot.id,
                quantity: 0,
            }
        });
    }

    return newProduct;
}

type NewProductDTO = Omit<DbProduct, "id" | "created_at">;

export { type DbProduct as Product };
export { type NewProductDTO as NewProductDTO };
