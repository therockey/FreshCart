"use client";
import { getCart, getCartPrice } from "@/api/CustomerFetch";
import CartListItem from "@/components/cart/CartListItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Page = () => {
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart("1231"),
  });

  const { data: priceData } = useQuery({
    queryKey: ["cartPrice"],
    queryFn: getCartPrice("1231"),
  });

  return (
    <div className="flex justify-center flex-col  text-center p-5 max-w-[1200px] mx-auto">
      <h2 className="text-4xl font-bold mb-4">Twój koszyk</h2>
      <h3 className="mb-10">Kontynuuj zakupy bądź złóż zamówienie</h3>
      <Separator />
      {cart &&
        cart.products.map((product, index) => (
          <div key={index}>
            <CartListItem {...product} quantity={cart.quantities[index]} />
            <Separator />
          </div>
        ))}

      <div className="flex flex-col items-center py-4">
        <h3 className="text-2xl">
          Suma:{" "}
          <span className="font-bold">
            {cart && priceData?.priceAfterDiscount} zł
          </span>
        </h3>
        <h3 className="text-xl ">
          Oszczędzasz:{" "}
          <span className="font-bold">{cart && priceData?.discount} zł</span>
        </h3>
        {priceData?.freeDelivery && (
          <span className="italic">Darmowa dostawa</span>
        )}
      </div>
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
