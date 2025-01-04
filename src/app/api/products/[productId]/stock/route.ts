import {NextRequest} from "next/server";
import {getAllProductStocks} from "@/service/Stock";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string }> }
) {
    const { productId } = await params;
    const data = await getAllProductStocks(parseInt(productId));
    return Response.json(data);
}