"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog";
import { Plus, Trash, CogFour, Search, ChartBarTwo } from "@mynaui/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MachineType, useCustomMachine } from "@/hooks/useCustomMachine";
import React from "react";
import { AddProductStates } from "@/xstate/addProductMachine";
import { ProductNameInput } from "@/components/products/ProductNameInput";
import { ProductDataInput } from "@/components/products/ProductDataInput";
import { Confirmation } from "@/components/products/Confirmation";
import { getProducts } from "@/api/EmployeeFetch";
import {SuccessPage} from "@/components/products/SuccessPage";

const ProductsPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: getProducts,
  });

  const { state, ...eventSenders } = useCustomMachine(MachineType.ADD_PRODUCT);

    return (
        <div className="p-5">
            <div className="flex w-full items-center space-x-10">
                <div className="flex w-full items-center space-x-2">
                    <Input type="search" placeholder="ID lub nazwa produktu"/>
                    <Button type="submit">
                        <Search/>
                    </Button>
                </div>
                <Button type="submit">
                    <Plus/>
                    Dodaj produkt
                </Button>
            </div>

            <div className="flex flex-col gap-2 py-8">
                {data &&
                    data.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-row justify-between py-2.5 px-5 rounded bg-accent h-16"
                        >
                            <div className="flex flex-row space-x-5">
                                <div className="content-center font-bold">ID: {product.id}</div>
                                <div className="content-center">{product.name}</div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2.5">
                                <Button className="bg-secondary h-full">
                                    <ChartBarTwo/>
                                    Zarządzaj stanem
                                </Button>
                                <Button size="icon" className="bg-primary h-full">
                                    <CogFour/>
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="icon" className="bg-primary h-full">
                                            <Trash/>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                                        {state === AddProductStates.NAME && (
                                            <ProductNameInput {...eventSenders} />
                                        )}
                                        {state === AddProductStates.DATA && (
                                            <ProductDataInput {...eventSenders} />
                                        )}
                                        {state === AddProductStates.CONFIRM && (
                                            <Confirmation {...eventSenders} />
                                        )}
                                        {state === AddProductStates.SUCCESS && <SuccessPage />}
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductsPage;
