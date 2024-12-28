import React from "react";
import { getCart } from "@/api/CustomerFetch";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cart } from "@/types/Cart";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const Overview = ({ sendBack, sendNext }: any) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: () => getCart("1231"),
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading order details.</p>;
  }

  const order = data as Cart;

  // Calculate total price
  const totalPrice = order.products.reduce((total, product, index) => {
    const quantity = order.quantities[index];
    return total + product.price * quantity;
  }, 0);

  return (
    <div className="p-4">
      <div className="space-y-4">
        {order.products.map((product, index) => (
          <>
            <div
              key={product.id || index}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  {product.description && (
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                  )}
                  {product.category && (
                    <p className="text-xs text-gray-400">
                      Category: {product.category}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p>
                  Price: ${product.price.toFixed(2)} x {order.quantities[index]}
                </p>
                <p className="font-bold">
                  Total: ${(product.price * order.quantities[index]).toFixed(2)}
                </p>
              </div>
            </div>{" "}
          </>
        ))}

        <Separator className="my-4" />

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Total Price:</h3>
          <p className="text-xl font-semibold">${totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <Button onClick={sendBack} variant="outline">
        Back
      </Button>
      <Button onClick={sendNext} className="ml-2">
        Next
      </Button>
    </div>
  );
};
