import { Order } from "@/types/Order";

export async function getOrder(clientId: string): Promise<Order> {
  try {
    const response = await fetch(`/api/${clientId}/order`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch order: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching order for client ID ${clientId}:`, error);
    throw error;
  }
}
