import { NextRequest, NextResponse } from "next/server";
import { getCartWithPrice } from "@/service";

export async function GET(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  try {
    const { userId } = await context.params;
    const parsedUserId = parseInt(userId);

    if (isNaN(parsedUserId)) {
      return NextResponse.json(
        { error: "Invalid user ID. Must be a valid number." },
        { status: 400 }
      );
    }

    const cartPrice = await getCartWithPrice(parsedUserId);

    if (!cartPrice || !cartPrice.cart?.length) {
      return NextResponse.json({ message: "Data not found." }, { status: 404 });
    }

    return NextResponse.json(cartPrice, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart price:", error);

    return NextResponse.json(
      { error: (error as Error).message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
