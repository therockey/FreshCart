import {NextRequest} from "next/server";
import {getProduct} from "@/service";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string }> }
) {
    const { productId } = await params;
    const data = await getProduct(parseInt(productId));
    return Response.json(data);
}