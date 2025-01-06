import { GET, PUT } from "@/app/api/products/[productId]/stock/[depotId]/route";
import { getProductStock, updateProductStock } from "@/service/Stock/Stock";
import { NextRequest } from "next/server";

jest.mock("@/service/Stock/Stock", () => ({
    getProductStock: jest.fn(),
    updateProductStock: jest.fn(),
}));

jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data, options) => ({
            data,
            ...options,
        })),
    },
}));

const mockStockResponse = {
    productId: 1,
    depotId: 1,
    quantity: 100,
};

const request = {} as NextRequest;
const context = { params: { productId: "1", depotId: "1" } };

describe("GET: /products/[productId]/stock/[depotId]", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("responds with 200 and stock data", async () => {
        (getProductStock as jest.Mock).mockResolvedValueOnce(mockStockResponse);

        const response = await GET(request, context);

        expect(response.status).toBe(200);
        // @ts-ignore
        expect(response.data).toEqual(mockStockResponse);

        expect(getProductStock).toHaveBeenCalledWith(1, 1);
    });

    it("responds with 404 when no stock data is found", async () => {
        (getProductStock as jest.Mock).mockResolvedValueOnce(null);

        const response = await GET(request, context);

        expect(response.status).toBe(404);
        // @ts-ignore
        expect(response.data).toEqual({
            error: "Failed to find stock",
        });
    });

    it("responds with 500 when getProductStock throws an error", async () => {
        (getProductStock as jest.Mock).mockRejectedValueOnce(new Error("Service error"));

        const response = await GET(request, context);

        expect(response.status).toBe(500);
        // @ts-ignore
        expect(response.data).toEqual({
            error: "An error occurred while processing GET: /products/[productId]/stock/[depotId].",
        });
    });
});

describe("PUT: /products/[productId]/stock/[depotId]", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("responds with 200 when stock is successfully updated", async () => {
        const mockRequest = {
            json: jest.fn(async () => ({ quantity: 50 })),
            method: "PUT",
        } as unknown as NextRequest;

        (updateProductStock as jest.Mock).mockResolvedValueOnce({ success: true });

        const response = await PUT(mockRequest, context);

        expect(response.status).toBe(200);
        // @ts-expect-error
        expect(response.data).toEqual({ success: true });

        expect(updateProductStock).toHaveBeenCalledWith(1, 1, 50);
    });

    it("responds with 404 when stock update fails", async () => {
        const mockRequest = {
            json: jest.fn(async () => ({ quantity: 50 })),
            method: "PUT",
        } as unknown as NextRequest;

        (updateProductStock as jest.Mock).mockResolvedValueOnce(false);

        const response = await PUT(mockRequest, context);

        expect(response.status).toBe(404);
        // @ts-ignore
        expect(response.data).toEqual({
            error: "Failed to put stock",
        });
    });

    it("responds with 500 when updateProductStock throws an error", async () => {
        const mockRequest = {
            json: jest.fn(async () => ({ quantity: 50 })),
            method: "PUT",
        } as unknown as NextRequest;

        (updateProductStock as jest.Mock).mockRejectedValueOnce(new Error("Service error"));

        const response = await PUT(mockRequest, context);

        expect(response.status).toBe(500);
        // @ts-ignore
        expect(response.data).toEqual({
            error: "An error occurred while processing PUT: /products/[productId]/stock/[depotId].",
        });
    });
});