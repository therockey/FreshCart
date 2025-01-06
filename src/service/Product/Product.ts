import { prisma } from "@/lib/prisma";
import { createProductStock } from "@/service/Stock/Stock";
import { NewProductDTO, Product } from "./types";
import { getDepots } from "../Depot";

export const getProducts = async (): Promise<Product[]> => {
  return prisma.product.findMany();
};

export const getProduct = async (
  productId: number
): Promise<Product | null> => {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
};

export const addProduct = async (
  product: NewProductDTO
): Promise<NewProductDTO | null> => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        ...product,
        created_at: new Date(),
      },
    });

    const depots = await getDepots();
    for (const depot of depots) {
      await createProductStock(newProduct.id, depot.id, 0);
    }

    return newProduct;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

export const deleteProduct = async (productId: number): Promise<Product> => {

    await prisma.productStock.deleteMany({
        where: {
        fk_product_id: productId,
        },
    });

    return prisma.product.delete({
        where: {
        id: productId,
        },
    });
}
