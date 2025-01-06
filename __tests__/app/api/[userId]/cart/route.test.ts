import { GET } from "@/app/api/[userId]/cart/route";
import { getCartWithPrice } from "@/service/Stock";
import { NextRequest } from "next/server";

jest.mock("@/service", () => ({
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

  it("responds with 400 for invalid userId", async () => {
    const context = { params: { userId: "invalid" } };

    const response = await GET(request, context);

    expect(response.status).toBe(400);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "Invalid user ID. Must be a valid number.",
    });
  });

  it("responds with 404 when no cart data is found", async () => {
    (getCartWithPrice as jest.Mock).mockResolvedValueOnce(null);

    const response = await GET(request, context);

    expect(response.status).toBe(404);
    // @ts-ignore
    expect(response.data).toEqual({ message: "Data not found." });
  });

  it("responds with 500 and error message from getCartWithPrice", async () => {
    (getCartWithPrice as jest.Mock).mockRejectedValueOnce(
      new Error("Database error")
    );

    const response = await GET(request, context);

    expect(response.status).toBe(500);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "Database error",
    });
  });

  it("responds with 500 and default error when getCartWithPrice does not provide anything", async () => {
    (getCartWithPrice as jest.Mock).mockRejectedValueOnce(new Error(""));

    const response = await GET(request, context);

    expect(response.status).toBe(500);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "An unexpected error occurred.",
    });
  });
});

// import { prisma } from "@/lib/prisma";
// import { getCartWithPrice } from "@/service";
// import { calculateDiscount, calculateUserCartTotal } from "@/service/utils";
// import { getUserLpSettings, getUserLpStats } from "@/service/LoyaltyProg";
// import { request } from "http";

// jest.mock("@/lib/prisma", () => ({
//   prisma: {
//     client: {
//       findUnique: jest.fn(),
//     },
//   },
// }));

// jest.mock("@/service/utils", () => ({
//   calculateUserCartTotal: jest.fn(),
//   calculateDiscount: jest.fn(),
// }));

// jest.mock("@/service/LoyaltyProg", () => ({
//   getUserLpSettings: jest.fn(),
//   getUserLpStats: jest.fn(),
// }));

// describe("getCartWithPrice", () => {
// //   it("test /api/1/cart ", async () => {
// //     const response = await request("/api/1/cart");
// //     expect(response.status).toBe(200);
// //   });

//   it("should return cart data with price details", async () => {
//     // Mock Prisma client response
//     (prisma.client.findUnique as jest.Mock).mockResolvedValue({
//       Cart: {
//         CartProducts: [{ Product: { id: 1, name: "Product 1" }, quantity: 2 }],
//       },
//     });

//     // Mock utility functions
//     (calculateUserCartTotal as jest.Mock).mockReturnValue(200);
//     (getUserLpSettings as jest.Mock).mockResolvedValue({
//       is_active: true,
//       point_threshold: 100,
//     });
//     (getUserLpStats as jest.Mock).mockResolvedValue({ current_pts: 50 });
//     (calculateDiscount as jest.Mock).mockReturnValue({
//       price: 200,
//       discount: 20,
//     });

//     const result = await getCartWithPrice(1);

//     expect(result).toEqual({
//       totalPrice: 180, // 200 - 20
//       discount: 20,
//       gainedPoints: 50,
//       cart: [{ product: { id: 1, name: "Product 1" }, quantity: 2 }],
//     });

//     // Validate that mocks were called correctly
//     expect(prisma.client.findUnique).toHaveBeenCalledWith({
//       where: { fk_system_user_id: 1 },
//       include: {
//         Cart: {
//           include: {
//             CartProducts: {
//               include: { Product: true },
//             },
//           },
//         },
//       },
//     });
//     expect(calculateUserCartTotal).toHaveBeenCalledWith([
//       { product: { id: 1, name: "Product 1" }, quantity: 2 },
//     ]);
//     expect(getUserLpSettings).toHaveBeenCalledWith(1);
//     expect(getUserLpStats).toHaveBeenCalledWith(1);
//     expect(calculateDiscount).toHaveBeenCalledWith(200, 50, 100);
//   });
// });
