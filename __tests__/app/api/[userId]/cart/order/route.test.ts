import { POST } from "@/app/api/[userId]/order/route";
import { placeOrder } from "@/service/Order";
import { NextRequest } from "next/server";

jest.mock("@/service/Order", () => ({
  placeOrder: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      data,
      ...options,
    })),
  },
}));

const mockOrderResponse = {
  orderId: 123,
  status: "placed",
  message: "Order successfully placed.",
};

const request = {
  json: jest.fn(async () => ({ address: "123 Test Street" })),
} as unknown as NextRequest;

const context = { params: { userId: "1" } };

describe("POST: /[userId]/order", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("responds with 200 when order is successfully placed", async () => {
    const mockRequest = {
      json: jest.fn(async () => ({ address: "123 Test Street" })),
      method: "POST",
    } as unknown as NextRequest;

    const mockContext = { params: { userId: "1" } };
    (placeOrder as jest.Mock).mockResolvedValueOnce(mockOrderResponse);

    const response = await POST(mockRequest, mockContext);

    expect(response.status).toBe(200);
    // @ts-ignore
    expect(response.data).toEqual(mockOrderResponse);

    expect(placeOrder).toHaveBeenCalledWith(1, { address: "123 Test Street" });
  });
  it("responds with 404 when order placement fails", async () => {
    (placeOrder as jest.Mock).mockResolvedValueOnce(null);

    const response = await POST(request, context);

    expect(response.status).toBe(404);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "Failed to post order.",
    });
  });

  it("responds with 404 when address is missing in the request body", async () => {
    const invalidRequest = {
      json: jest.fn(async () => ({})), // Missing 'address'
    } as unknown as NextRequest;

    const response = await POST(invalidRequest, context);

    expect(response.status).toBe(404);
  });

  it("responds with 500 when userId is invalid", async () => {
    const invalidContext = { params: { userId: "invalid" } };

    const response = await POST(request, invalidContext);

    expect(response.status).toBe(500);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "An error occurred while processing POST: /[userId]/order.",
    });
  });

  it("responds with 500 when placeOrder throws an error", async () => {
    (placeOrder as jest.Mock).mockRejectedValueOnce(new Error("Service error"));

    const response = await POST(request, context);

    expect(response.status).toBe(500);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "An error occurred while processing POST: /[userId]/order.",
    });
  });
});
