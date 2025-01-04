"use client";
import { getLoyaltyProgStats, getOrderHistory } from "@/api/CustomerFetch";
import LoyaltyProgStatBadge from "@/components/loyaltyProg/LoyaltyProgStatBadge";
import OrderHistoryListItem from "@/components/loyaltyProg/OrderHistoryListItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Page = () => {
  const { data: orders } = useQuery({
    queryKey: ["orderHistory"],
    queryFn: getOrderHistory("1"),
  });

  const { data: loyaltyProgStats } = useQuery({
    queryKey: ["loyaltyProgStats"],
    queryFn: getLoyaltyProgStats("1"),
  });

  return (
    <div className="flex justify-center flex-col  text-center p-5 max-w-[1200px] mx-auto gap-4">
      <h2 className="text-4xl font-bold mb-4">Program lojalnościowy</h2>
      {loyaltyProgStats && (
        <div className="flex flex-row  justify-between mx-[4rem] my-5">
          <LoyaltyProgStatBadge
            label="Suma zdobytych punktów"
            value={`${loyaltyProgStats.total_pts}`}
          />
          <LoyaltyProgStatBadge
            label="Punkty obecne"
            value={`${loyaltyProgStats.current_pts}`}
          />
          <LoyaltyProgStatBadge
            label="Oszczędzone pieniądze"
            value={`${loyaltyProgStats.money_saved} zł`}
          />
        </div>
      )}
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
