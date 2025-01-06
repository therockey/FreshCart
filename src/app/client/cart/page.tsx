"use client";
import CartListItem from "@/components/cart/CartListItem";
import { ErrorView } from "@/components/commons/ErrorView";
import { Loader } from "@/components/commons/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartPage } from "@/hooks/app/client/cart/useCartPage";
import Link from "next/link";

const Page = () => {
  const { data: cart, error, isFetching } = useCartPage(1);
  if (isFetching) return <Loader />;
  if (error || !cart) return <ErrorView />;
  return (
    <div className="flex justify-center flex-col  text-center p-5 max-w-[1200px] mx-auto">
      <h2 className="text-4xl font-bold mb-4">Twój koszyk</h2>
      <h3 className="mb-10">Kontynuuj zakupy bądź złóż zamówienie</h3>
      <Separator />
      {cart &&
        cart.cart?.map(({ product, quantity }) => (
          <div key={product.id}>
            <CartListItem {...product} quantity={quantity} />
            <Separator />
          </div>
        ))}

      <div className="flex flex-col items-center py-4">
        <h3 className="text-2xl">
          Suma:{" "}
          <span className="font-bold">
            {cart && cart.totalPrice.toFixed(2)} zł
          </span>
        </h3>
        <h3 className="text-xl ">
          Oszczędzasz:{" "}
          <span className="font-bold">{cart && cart.discount} zł</span>
        </h3>
        <h3 className="text-xl ">
          Zyskujesz punktów:{" "}
          <span className="font-bold">{cart && cart.gainedPoints} zł</span>
        </h3>
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
