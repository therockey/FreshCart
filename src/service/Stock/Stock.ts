import { prisma } from "@/lib/prisma";

export const getProductStock = async (productId: number, depotId: number) => {
  return prisma.productStock.findFirst({
    where: {
      fk_product_id: productId,
      fk_depot_id: depotId,
    },
    include: {
      Depot: true,
    },
  });
};

export const getAllProductStocks = async (productId: number) => {
  return prisma.productStock.findMany({
    where: {
      fk_product_id: productId,
    },
    include: {
      Depot: true,
    },
  });
};

export const updateProductStock = async (
  productId: number,
  depotId: number,
  quantity: number
) => {
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
};

export const createProductStock = async (
  productId: number,
  depotId: number,
  quantity: number
) => {
  return prisma.productStock.create({
    data: {
      fk_product_id: productId,
      fk_depot_id: depotId,
      quantity,
    },
  });
};
