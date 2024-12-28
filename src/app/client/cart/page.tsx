"use client";
import { getCart } from "@/api/CustomerFetch";
import CartListItem from "@/components/cart/CartListItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Page = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: getCart("1231"),
  });

  return (
    <div className="flex justify-center flex-col  text-center p-5 max-w-[1200px] mx-auto">
      <h2 className="text-4xl font-bold mb-4">Twój koszyk</h2>
      <h3 className="mb-10">Kontynuuj zakupy bądź złóż zamówienie</h3>
      <Separator />
      {data &&
        data.products.map((product, index) => (
          <>
            <CartListItem
              key={index}
              {...product}
              quantity={data.quantities[index]}
            />
            <Separator />
          </>
        ))}
      <Button
        variant="default"
        className="flex-grow-0 flex-none w- mx-auto my-[2rem]"
        asChild
      >
        <Link href="cart/order">Złóż zamówienie</Link>
      </Button>
    </div>
  );
};

export default Page;
