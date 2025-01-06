import { addProduct, getProducts } from "@/service/Product";
import { NewProductDTO } from "@/service/Product/types";
import { createApiHandler } from "@/utils/ApiHandling";
import { NextRequest } from "next/server";

export const GET = createApiHandler({
  methodName: "GET: /products",
  fetchData: async () => await getProducts(),
  notFoundMessage: "Failed to find product",
});



//todo
export async function POST(request: NextRequest) {
  const res = await request.json();
  const data = await addProduct(res as NewProductDTO);
  return Response.json(data);
}
