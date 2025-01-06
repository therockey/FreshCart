import { GET } from "@/app/api/depots/route";
import { getDepots } from "@/service/Depot";
import { NextRequest } from "next/server";

jest.mock("@/service/Depot", () => ({
    getDepots: jest.fn(),
}));

jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data, options) => ({
            data,
            ...options,
        })),
    },
}));

const mockDepotsResponse = [
    { id: 1, name: "Depot 1" },
    { id: 2, name: "Depot 2" },
];
const request = {} as NextRequest;
const context = { params: { userId: "1" } };

describe("GET: /depots", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("responds with 200 and depots data", async () => {
        (getDepots as jest.Mock).mockResolvedValueOnce(mockDepotsResponse);

        const response = await GET(request, context);

        expect(response.status).toBe(200);
        // @ts-ignore
        expect(response.data).toEqual(mockDepotsResponse);

        expect(getDepots).toHaveBeenCalled();
    });

    it("responds with 404 when no depots data is found", async () => {
        (getDepots as jest.Mock).mockResolvedValueOnce(null);

        const response = await GET(request, context);

        expect(response.status).toBe(404);
        // @ts-ignore
        expect(response.data).toEqual({
            error: "Failed to find depots",
        });
    });

    it("responds with 500 when getDepots throws an error", async () => {
        (getDepots as jest.Mock).mockRejectedValueOnce(new Error("Service error"));

        const response = await GET(request, context);

        expect(response.status).toBe(500);
        // @ts-ignore
        expect(response.data).toEqual({
            error: "An error occurred while processing GET: /depots.",
        });
    });
});