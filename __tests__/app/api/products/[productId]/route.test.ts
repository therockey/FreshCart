import { GET, DELETE } from "@/app/api/products/[productId]/route";
import { getProduct, deleteProduct } from "@/service/Product";
import { NextRequest } from "next/server";

jest.mock("@/service/Product", () => ({
    getProduct: jest.fn(),
    deleteProduct: jest.fn(),
}));

jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data, options) => ({
            data,
            ...options,
        })),
    },
}));

const mockProductResponse = {
    id: 1,
    name: "Product 1",
    description: "Description of Product 1",
    price: 100,
    weight: 200,
};
const request = {} as NextRequest;
const context = { params: { productId: "1" }};

describe("GET: /products/[productId]", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("responds with 200 and product data", async () => {
        (getProduct as jest.Mock).mockResolvedValueOnce(mockProductResponse);

        const response = await GET(request, context);

        expect(response.status).toBe(200);
        // @ts-ignore
        expect(response.data).toEqual(mockProductResponse);

        expect(getProduct).toHaveBeenCalledWith(1);
    });

    it("responds with 404 when no product data is found", async () => {
        (getProduct as jest.Mock).mockResolvedValueOnce(null);

        const response = await GET(request, context);

        expect(response.status).toBe(404);
        // @ts-ignore
        expect(response.data).toEqual({
            error: "Failed to find product",
        });
    });

    it("responds with 500 when getProduct throws an error", async () => {
        (getProduct as jest.Mock).mockRejectedValueOnce(new Error("Service error"));

        const response = await GET(request, context);

        expect(response.status).toBe(500);
        // @ts-ignore
        expect(response.data).toEqual({
            error: "An error occurred while processing GET: /products/[productId].",
        });
    });
});

describe("DELETE: /products/[productId]", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("responds with 200 when product is successfully deleted", async () => {
        (deleteProduct as jest.Mock).mockResolvedValueOnce(true);

        const response = await DELETE(request, context);

        expect(response.status).toBe(200);
        // @ts-ignore
        expect(response.data).toEqual({ success: true });

        expect(deleteProduct).toHaveBeenCalledWith(1);
    });

    it("responds with 404 when product deletion fails", async () => {
        (deleteProduct as jest.Mock).mockResolvedValueOnce(false);

        const response = await DELETE(request, context);

        expect(response.status).toBe(404);
        // @ts-ignore
        expect(response.data).toEqual({
            error: "Failed to delete product",
        });
    });

    it("responds with 500 when deleteProduct throws an error", async () => {
        (deleteProduct as jest.Mock).mockRejectedValueOnce(new Error("Service error"));

        const response = await DELETE(request, context);

        expect(response.status).toBe(500);
        // @ts-ignore
        expect(response.data).toEqual({
            error: "An error occurred while processing DELETE: /products/[productId].",
        });
    });
});