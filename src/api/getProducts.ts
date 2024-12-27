import { Product } from "@/types/Product";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}