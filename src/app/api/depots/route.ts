import { NextRequest } from "next/server";
import {getDepots} from "@/service";

export async function GET(request: NextRequest) {
    const depots = await getDepots();
    return Response.json(depots);
}