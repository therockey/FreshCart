import { getCart } from "@/api/CustomerFetch";
import { useQuery } from "@tanstack/react-query";

export const useCartPage = (userId: number) => {
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getCart(userId),
  });
  return query;
};
