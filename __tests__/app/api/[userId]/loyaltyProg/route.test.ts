import { GET } from "@/app/api/[userId]/loyaltyProg/route";
import { getUserLoyaltyProgSettings } from "@/service/LoyaltyProg";
import { NextRequest } from "next/server";

jest.mock("@/service/LoyaltyProg", () => ({
  getUserLoyaltyProgSettings: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      data,
      ...options,
    })),
  },
}));
const mockLoyaltyProg = {
  id: 1,
  is_greedy: false,
  point_threshold: 1202,
  free_delivery: false,
  is_active: true,
};
const request = {} as NextRequest;
const context = { params: { userId: "1" } };

describe("GET: /[userId]/loyaltyProg", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("responds with 200 with loyaltyProg data", async () => {
    (getUserLoyaltyProgSettings as jest.Mock).mockResolvedValueOnce(
      mockLoyaltyProg
    );

    const response = await GET(request, context);

    expect(response.status).toBe(200);
    // @ts-ignore
    expect(response.data).toEqual(mockLoyaltyProg);

    expect(getUserLoyaltyProgSettings).toHaveBeenCalledWith(1);
  });

  it("responds with 404 when no loyaltyProg data is found", async () => {
    (getUserLoyaltyProgSettings as jest.Mock).mockResolvedValueOnce(null);

    const response = await GET(request, context);

    expect(response.status).toBe(404);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "Loyalty program settings not found for the given userId.",
    });
  });

  it("responds with 500 for invalid userId", async () => {
    const context = { params: { userId: "invalid" } };

    const response = await GET(request, context);

    expect(response.status).toBe(500);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "An error occurred while processing GET: /[userId]/loyaltyProg.",
    });
  });

  it("responds with 500 and default error when getUserLoyaltyProgSettings does not provide anything", async () => {
    (getUserLoyaltyProgSettings as jest.Mock).mockRejectedValueOnce(
      new Error("")
    );

    const response = await GET(request, context);

    expect(response.status).toBe(500);
    // @ts-ignore
    expect(response.data).toEqual({
      error: "An error occurred while processing GET: /[userId]/loyaltyProg.",
    });
  });
});
