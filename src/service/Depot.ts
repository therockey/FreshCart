import { Depot as DbDepot } from "@prisma/client";
import {prisma} from "@/lib/prisma";

export const getDepots = async () => {
    return prisma.depot.findMany();
}

export { type DbDepot as Depot };