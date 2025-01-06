import { getLoyaltyProgPage } from "@/api/CustomerFetch";
import { useQuery } from "@tanstack/react-query";

export const useLoyaltyProgPage = (userId: number) => {
  const query = useQuery({
    queryKey: ["loyaltyProgStats"],
    queryFn: getLoyaltyProgPage(userId),
  });
  return query;
};
