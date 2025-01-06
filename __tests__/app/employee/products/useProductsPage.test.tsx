import { renderHook, waitFor } from "@testing-library/react";
import { getProducts } from "@/api/EmployeeFetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProductsPage } from "@/hooks/app/employee/products/useProductsPage";

const mockProducts = [
    { id: 1, name: "Product 1", description: "Description 1", price: 10, weight: 1, created_at: "2021-01-01T00:00:00.000Z", category: "Category 1" },
    { id: 2, name: "Product 2", description: "Description 2", price: 20, weight: 2, created_at: "2021-01-01T00:00:00.000Z", category: "Category 2" },
    { id: 3, name: "Product 3", description: "Description 3", price: 30, weight: 3, created_at: "2021-01-01T00:00:00.000Z", category: "Category 3" },
    { id: 4, name: "Product 4", description: "Description 4", price: 40, weight: 4, created_at: "2021-01-01T00:00:00.000Z", category: "Category 4" },
    { id: 5, name: "Product 5", description: "Description 5", price: 50, weight: 5, created_at: "2021-01-01T00:00:00.000Z", category: "Category 5" },
];

jest.mock("@/api/EmployeeFetch", () => ({
    getProducts: jest.fn(() => Promise.resolve(mockProducts)),
}));

describe("useProductsPage", () => {
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

    it("fetches product data successfully", async () => {
        const { result } = renderHook(() => useProductsPage(), { wrapper });

        await waitFor(() => expect(result.current.products).toEqual(mockProducts));

        expect(getProducts).toHaveBeenCalled();
    });

    it("handles error when fetching product data fails", async () => {
        const mockError = new Error("Failed to fetch product data");

        (getProducts as jest.Mock).mockImplementationOnce(() => Promise.reject(mockError));

        const { result } = renderHook(() => useProductsPage(), { wrapper });

        await waitFor(() => expect(result.current.products).toBeUndefined());

        expect(getProducts).toHaveBeenCalled();
    });
});