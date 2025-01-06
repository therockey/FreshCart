import { prisma } from "@/lib/prisma";
import { Depot } from "./types";

export const getDepots = async (): Promise<Depot[]> => {
  return prisma.depot.findMany();
};

