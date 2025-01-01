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
import { UpdateStockStates } from "@/xstate/updateStockMachine";
import { ProductNameInput } from "@/components/products/add/ProductNameInput";
import { ProductDataInput } from "@/components/products/add/ProductDataInput";
import { Confirmation } from "@/components/products/add/Confirmation";
import { DepotPicker } from "@/components/products/updateStock/DepotPicker";
import { getProducts } from "@/api/EmployeeFetch";
import {SuccessPage} from "@/components/products/add/SuccessPage";
import { useForm } from "react-hook-form";

const ProductsPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { state: addState, ...eventSenders } = useCustomMachine(MachineType.ADD_PRODUCT);
  const nameFormProps = useForm();
  const dataFormProps = useForm();

  const { state: updateStockState, ...updateStockEventSenders } = useCustomMachine(MachineType.UPDATE_STOCK);
  const updateStockFormProps = useForm();

  const { watch: watchNameFormProps } = nameFormProps;
  const { watch: watchDataFormProps } = dataFormProps;

  console.log("Name Form values:", watchNameFormProps());
  console.log("Data Form values:", watchDataFormProps());

    return (
        <div className="p-5">
            <div className="flex w-full items-center space-x-10">
                <div className="flex w-full items-center space-x-2">
                    <Input type="search" placeholder="ID lub nazwa produktu"/>
                    <Button type="submit">
                        <Search/>
                    </Button>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button type="submit">
                            <Plus/>
                            Dodaj produkt
                        </Button>
                    </DialogTrigger>
                    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                        {addState === AddProductStates.NAME && (
                            <ProductNameInput {...eventSenders} {...nameFormProps}/>
                        )}
                        {addState === AddProductStates.DATA && (
                            <ProductDataInput {...eventSenders} {...dataFormProps}/>
                        )}
                        {addState === AddProductStates.CONFIRM && (
                            <Confirmation {...eventSenders} productName={watchNameFormProps().name} onConfirm={() => {}}/>
                        )}
                        {addState === AddProductStates.SUCCESS && <SuccessPage />}
                    </DialogContent>
                </Dialog>
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

                            <div className="flex space-x-2.5">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="bg-secondary h-full">
                                            <ChartBarTwo/>
                                            Zarządzaj stanem
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                                        {updateStockState === UpdateStockStates.DEPOT && (
                                            <DepotPicker {...updateStockEventSenders} {...updateStockFormProps}/>
                                        )}
                                        {updateStockState === UpdateStockStates.STOCK && (
                                            <ProductDataInput {...updateStockEventSenders} {...updateStockFormProps}/>
                                        )}
                                    </DialogContent>
                                </Dialog>
                                <Button size="icon" className="bg-primary h-full">
                                    <CogFour/>
                                </Button>
                                <Button size="icon" className="bg-primary h-full">
                                    <Trash/>
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductsPage;
