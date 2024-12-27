import LoyaltyProgStatBadge from "@/components/loyaltyProg/LoyaltyProgStatBadge";
import OrderHistoryListItem from "@/components/loyaltyProg/OrderHistoryListItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface OrderHistoryRecord {
  id: string;
  price: number;
  date: Date;
}
const labels = ["Punkty", "Punkty obecne", "Oszczędzone pieniądze"];
const Page = () => {
  const badgeProps = [
    { label: "Łączne zdobyte punkty", value: "123" },
    { label: "Punkty obecne", value: "123" },
    { label: "Oszczędzone pieniądze", value: "123zł" },
  ];
  const orders: OrderHistoryRecord[] = [
    { id: "1231", price: 123, date: new Date() },
    { id: "1232", price: 123, date: new Date() },
    { id: "1233", price: 123, date: new Date() },
    { id: "1234", price: 123, date: new Date() },
  ];
  return (
    <div className="flex justify-center flex-col  text-center p-5 max-w-[1200px] mx-auto gap-4">
      <h2 className="text-4xl font-bold mb-4">Program lojalnościowy</h2>
      <div className="flex flex-row  justify-between mx-[4rem] my-5">
        {badgeProps.map((badge, index) => (
          <LoyaltyProgStatBadge key={badge.label} {...badge} />
        ))}
      </div>
      <Button asChild variant="default" className="mx-auto">
        <Link href={"loyaltyProg/edit"}>Edytuj program lojalnościowy</Link>
      </Button>
      <h3 className="text-3xl font-bold my-10">Historia zamówień</h3>

      {orders.map((order) => (
        <>
          <OrderHistoryListItem key={order.id} {...order} />
          <Separator />
        </>
      ))}
    </div>
  );
};
export default Page;
