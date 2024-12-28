"use client";
import { getLoyaltyProgStats, getOrderHistory } from "@/api/CustomerFetch";
import LoyaltyProgStatBadge from "@/components/loyaltyProg/LoyaltyProgStatBadge";
import OrderHistoryListItem from "@/components/loyaltyProg/OrderHistoryListItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const labels = {
  totalPoints: "Suma zdobytych punktów",
  currentPoints: "Punkty obecne",
  savedMoney: "Oszczędzone pieniądze",
};
const Page = () => {
  const { data: orders } = useQuery({
    queryKey: ["orderHistory"],
    queryFn: getOrderHistory("1231"),
  });

  const { data: loyaltyProgStats } = useQuery({
    queryKey: ["loyaltyProgStats"],
    queryFn: getLoyaltyProgStats("1231"),
  });
  const badgeProps: { label: string; value: string }[] = Object.entries(
    labels
  ).map(([key, value]) => ({
    label: value,
    value: `${
      loyaltyProgStats ? loyaltyProgStats[key as keyof LoyaltyProgStats] : "..."
    } ${key === "savedMoney" ? "zł" : ""}`,
  }));
  return (
    <div className="flex justify-center flex-col  text-center p-5 max-w-[1200px] mx-auto gap-4">
      <h2 className="text-4xl font-bold mb-4">Program lojalnościowy</h2>
      <div className="flex flex-row  justify-between mx-[4rem] my-5">
        {badgeProps.map((badge) => (
          <LoyaltyProgStatBadge key={badge.label} {...badge} />
        ))}
      </div>
      <Button asChild variant="default" className="mx-auto">
        <Link href={"loyaltyProg/edit"}>Edytuj program lojalnościowy</Link>
      </Button>
      <h3 className="text-3xl font-bold my-10">Historia zamówień</h3>

      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <OrderHistoryListItem {...order} />
            <Separator />
          </div>
        ))}
    </div>
  );
};
export default Page;
