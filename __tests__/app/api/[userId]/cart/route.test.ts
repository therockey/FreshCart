import { GET } from "@/app/api/[userId]/cart/route";
import { getCartWithPrice } from "@/service/Cart";
import { NextRequest } from "next/server";

jest.mock("@/service/cart", () => ({
  getCartWithPrice: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      data,
      ...options,
    })),
  },
}));
const mockCart = [
  { product: { id: 1, name: "Product 1" }, quantity: 2 },
  { product: { id: 2, name: "Product 2" }, quantity: 3 },
];
const mockOtherProps = { totalPrice: 100, discount: 10, gainedPoints: 20 };
const request = {} as NextRequest;
const context = { params: { userId: "1" } };

describe("GET /api/[userId]/cart", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("responds with 200 with cart data", async () => {
    (getCartWithPrice as jest.Mock).mockResolvedValueOnce({
      ...mockOtherProps,
      cart: mockCart,
    });

    const response = await GET(request, context);

    expect(response.status).toBe(200);
    // @ts-ignore
    expect(response.data).toEqual({
      ...mockOtherProps,
      cart: mockCart,
    });

    expect(getCartWithPrice).toHaveBeenCalledWith(1);
  });

 
  it("responds with 404 when no cart data is found", async () => {
    (getCartWithPrice as jest.Mock).mockResolvedValueOnce(null);

    const response = await GET(request, context);

    expect(response.status).toBe(404);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "CartPrice not found for the given userId.",
    });
  });


  it("responds with 500 for invalid userId", async () => {
    const context = { params: { userId: "invalid" } };

    const response = await GET(request, context);

    expect(response.status).toBe(500);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "An error occurred while processing GET: /[userId]/cart.",
    });
  });



  it("responds with 500 and default error when getCartWithPrice does not provide anything", async () => {
    (getCartWithPrice as jest.Mock).mockRejectedValueOnce(new Error(""));

    const response = await GET(request, context);

    expect(response.status).toBe(500);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "An error occurred while processing GET: /[userId]/cart.",
    });
  });
});
