import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const depots = [
        {
            id: "1",
            location: "depot1",
            name: "Wrocław 1",
        },
        {
            id: "2",
            location: "depot2",
            name: "Wrocław 2",
        },
    ];

    return Response.json(depots);
}