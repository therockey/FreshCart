import {NextRequest} from "next/server";
import {getProductStock, updateProductStock} from "@/service/Stock";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string, depotId: string }> }
) {
    const { productId, depotId } = await params;
    const data = await getProductStock(parseInt(productId), parseInt(depotId));
    return Response.json(data);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ productId: string, depotId: string }> }
) {
    const res = await request.json();
    const { productId, depotId } = await params;
    const data = await updateProductStock(parseInt(productId), parseInt(depotId), parseInt(res.quantity));
    return Response.json(data);
}