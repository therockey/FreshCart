import { GET } from "@/app/api/[userId]/loyaltyProg/stats/route";
import { getUserLoyaltyProgStats } from "@/service/LoyaltyProg";
import { getUserOrderHistory } from "@/service/Order";
import { NextRequest } from "next/server";

jest.mock("@/service/LoyaltyProg", () => ({
  getUserLoyaltyProgStats: jest.fn(),
}));
jest.mock("@/service/Order", () => ({
  getUserOrderHistory: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      data,
      ...options,
    })),
  },
}));
const mockStats = {
  id: 1,
  current_pts: 50,
  total_pts: 150,
  money_saved: 25.5,
  total_spent: 500,
};
const mockHistory = [
  {
    id: 1,
    created_at: "2025-01-02T00:00:00.000Z",
    address: "esadas",
    loyaltyPointsGained: 10,
    freeDelivery: true,
    status: "completed",
    price: 21.98,
    fk_client_id: 1,
    fk_employee_id: null,
    contact_phone_num: "987-654-3210",
    payment_method: "Visa",
  },
];
const request = {} as NextRequest;
const context = { params: { userId: "1" } };

describe("GET: /[userId]/loyaltyProg/stats", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("responds with 200 with loyaltyProg data", async () => {
    (getUserLoyaltyProgStats as jest.Mock).mockResolvedValueOnce(mockStats);
    (getUserOrderHistory as jest.Mock).mockResolvedValueOnce(mockHistory);

    const response = await GET(request, context);

    expect(response.status).toBe(200);
    // @ts-ignore
    expect(response.data).toEqual({
      orderHistory: mockHistory,
      loyaltyProgStats: mockStats,
    });

    expect(getUserLoyaltyProgStats).toHaveBeenCalledWith(1);
    expect(getUserOrderHistory).toHaveBeenCalledWith(1);
  });

  it("responds with 404 when no loyaltyProg data is found", async () => {
    (getUserLoyaltyProgStats as jest.Mock).mockResolvedValueOnce(null);
    (getUserOrderHistory as jest.Mock).mockResolvedValueOnce(null);
    const response = await GET(request, context);

    expect(response.status).toBe(404);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "Loyalty program stats not found for the given userId.",
    });
  });

  it("responds with 500 for invalid userId", async () => {
    const context = { params: { userId: "invalid" } };

    const response = await GET(request, context);

    expect(response.status).toBe(500);
    // @ts-ignore
    expect(response.data).toEqual({
      error:
        "An error occurred while processing GET: /[userId]/loyaltyProg/stats.",
    });
  });

  it("responds with 500 and default error when getUserLoyaltyProgSettings does not provide anything", async () => {
    (getUserLoyaltyProgStats as jest.Mock).mockRejectedValueOnce(new Error(""));
    (getUserOrderHistory as jest.Mock).mockResolvedValueOnce(new Error(""));

    const response = await GET(request, context);

    expect(response.status).toBe(500);
    // @ts-ignore
    expect(response.data).toEqual({
      error:
        "An error occurred while processing GET: /[userId]/loyaltyProg/stats.",
    });
  });
});
