import { renderHook, waitFor } from "@testing-library/react";
import { getCart } from "@/api/CustomerFetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCartPage } from "@/hooks/app/client/cart/useCartPage";

const mockItems = [
  { product: { id: 1, name: "Product 1" }, quantity: 2 },
  { product: { id: 2, name: "Product 2" }, quantity: 3 },
];
const mockOtherProps = { totalPrice: 100, discount: 10, gainedPoints: 20 };
const mockCart = { cart: mockItems, ...mockOtherProps };

jest.mock("@/api/CustomerFetch", () => ({
  getCart: jest.fn(() => async () => Promise.resolve(mockCart)),
}));

describe("useCartPage", () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  it("fetches cart data successfully", async () => {
    const { result } = renderHook(() => useCartPage(1), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockCart);
    expect(getCart).toHaveBeenCalledWith(1);
  });

  it("handles error when fetching cart data fails", async () => {
    const mockError = new Error("Failed to fetch cart data");

    (getCart as jest.Mock).mockImplementationOnce(() => async () => Promise.reject(mockError));

    const { result } = renderHook(() => useCartPage(1), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(mockError);
    expect(getCart).toHaveBeenCalledWith(1);
  });

 
});
