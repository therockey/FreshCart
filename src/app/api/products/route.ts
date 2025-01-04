import { NextRequest } from "next/server";
import {addProduct, getProducts, NewProductDTO} from "@/service";

export async function GET(request: NextRequest) {
  const products = await getProducts();

  return Response.json(products);
}

export async function POST(request: NextRequest) {
    const res = await request.json();
    const data = await addProduct(res as NewProductDTO);
    return Response.json(data);
}