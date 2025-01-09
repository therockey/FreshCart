import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStocks, getProduct } from "@/api/EmployeeFetch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoCircle } from "@mynaui/icons-react";
import { GetProductStockType } from "@/service/Stock/types";
import {Loader} from "@/components/commons/Loader";

interface ProductInfoProps {
  productId: number;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ productId }) => {
  const {
    isPending: isProductPending,
    error: productError,
    data: product,
    refetch: refetchProduct
  } = useQuery({
    queryKey: ["productinfo", productId],
    queryFn: getProduct(productId.toString()),
  });

  const {
    isPending: isStockPending,
    error: stockError,
    data: stocks,
    refetch: refetchStocks
  } = useQuery({
    queryKey: ["stockinfo", productId],
    queryFn: getStocks(productId.toString()),
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      refetchProduct();
      refetchStocks();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-full hover:bg-accent">
          <InfoCircle />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onInput={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Informacje o produkcie</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col content-center space-y-4 px-10">
          {isProductPending && <Loader/>}
          {product && (
            <>
              <div className="flex flex-col space-y-0.5">
                <div className="font-bold">Nazwa produktu</div>
                <div className="text-2xl font-thin">{product.name}</div>
              </div>
              <div className="flex flex-col space-y-0.5">
                <div className="font-bold">Opis</div>
                <div className="text-2xl font-thin">{product.description}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col space-y-0.5">
                  <div className="font-bold">Cena</div>
                  <div className="text-2xl font-thin">{product.price} zł</div>
                </div>
                <div className="flex flex-col space-y-0.5 content-end">
                  <div className="font-bold w-fit self-end">Waga</div>
                  <div className="text-2xl font-thin w-fit">
                    {product.weight} g
                  </div>
                </div>
              </div>
            </>
          )}
          <div>
            <div className="font-bold">Stan magazynowy:</div>
            {isStockPending && <Loader/>}
            {stocks?.map((stock: GetProductStockType) => (
              <div key={stock?.id} className="flex flex-row justify-between">
                <div>{stock?.Depot.name}</div>
                <div>{stock?.quantity}</div>
              </div>
            ))}
          </div>
          <DialogClose asChild>
            <Button className="hover:bg-accent w-full">Zamknij</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
