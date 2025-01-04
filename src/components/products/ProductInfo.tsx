import React from "react";
import {useQuery} from "@tanstack/react-query";
import {getStocks, getProduct} from "@/api/EmployeeFetch";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {InfoCircle} from "@mynaui/icons-react";
import {GetProductStockType} from "@/service";

interface ProductInfoProps {
    productId: number;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({productId}) => {

    const {isPending: isProductPending, error: productError, data: product} = useQuery({
        queryKey: ["productinfo", productId],
        queryFn: getProduct(productId.toString()),
    });

    const {isPending: isStockPending, error: stockError, data: stocks} = useQuery({
        queryKey: ["stockinfo", productId],
        queryFn: getStocks(productId.toString()),
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-secondary h-full hover:bg-accent">
                    <InfoCircle/>
                    Zarządzaj stanem
                </Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()} onInput={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Informacje o produkcie</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col content-center space-y-4 px-10">
                    <div className="w-fit font-bold">
                        {product?.name}
                    </div>
                    <div className="w-fit">
                        {product?.description}
                    </div>
                    <div>
                        <div className="font-bold">Stan magazynowy:</div>
                        {stocks?.map((stock: GetProductStockType) => (
                            <div key={stock.id} className="flex flex-row justify-between">
                                <div>{stock.Depot.name}</div>
                                <div>{stock.quantity}</div>
                            </div>
                        ))}
                    </div>
                    <DialogClose asChild>
                        <Button className="hover:bg-accent w-full">
                            Zamknij
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}