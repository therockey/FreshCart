"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog";
import {Plus, Trash, CogFour, Search, ChartBarTwo} from "@mynaui/icons-react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {MachineType, useCustomMachine} from "@/hooks/useCustomMachine";
import React from "react";
import {AddProductStates} from "@/xstate/addProductMachine";
import {UpdateStockStates} from "@/xstate/updateStockMachine";
import {ProductNameInput} from "@/components/products/add/ProductNameInput";
import {ProductDataInput} from "@/components/products/add/ProductDataInput";
import {Confirmation} from "@/components/products/add/Confirmation";
import {DepotPicker} from "@/components/products/updateStock/DepotPicker";
import {createProduct, getProducts, updateProductStock} from "@/api/EmployeeFetch";
import {SuccessPage} from "@/components/products/add/SuccessPage";
import {useForm} from "react-hook-form";
import {ChangeStock} from "@/components/products/updateStock/ChangeStock";
import {StockUpdateSuccess} from "@/components/products/updateStock/StockUpdateSuccess";
import {NewProductDTO, UpdateStockDTO} from "@/service";
import {ProductInfo} from "@/components/products/ProductInfo";

const ProductsPage = () => {
    const {isPending, error, data, refetch} = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const {state: addState, ...eventSenders} = useCustomMachine(MachineType.ADD_PRODUCT);
    const createFormProps = useForm();

    const {state: updateStockState, ...updateStockEventSenders} = useCustomMachine(MachineType.UPDATE_STOCK);
    const updateStockFormProps = useForm();

    const {watch: watchCreateFormProps} = createFormProps;
    const {watch: watchUpdateStockFormProps} = updateStockFormProps;

    const addMutationFn = async (body: NewProductDTO) => {
        const data = await createProduct(body)();
        return data;
    };

    const updateStockMutationFn = async (body: UpdateStockDTO) => {
        const data = await updateProductStock(body)();
        return data;
    }

    const {mutate: addMutate} = useMutation({
        mutationFn: addMutationFn,
        onSuccess: () => {
            refetch();
        },
    });

    const {mutate: updateStockMutate} = useMutation({
        mutationFn: updateStockMutationFn,
    });

    const addProduct = () => {
        addMutate({
            ...watchCreateFormProps(),
            price: parseFloat(watchCreateFormProps().price),
            weight: parseInt(watchCreateFormProps().weight)
        } as NewProductDTO);
    }

    const updateStock = (productId: number) => {
        updateStockMutate({
            quantity: parseInt(watchUpdateStockFormProps().quantity),
            fk_depot_id: parseInt(watchUpdateStockFormProps().depot),
            fk_product_id: productId,
        } as UpdateStockDTO);
    }

    return (
        <div className="p-5">
            <div className="flex w-full items-center space-x-10">
                <div className="flex w-full items-center space-x-2">
                    <Input type="search" placeholder="ID lub nazwa produktu"/>
                    <Button type="submit" className="hover:bg-accent">
                        <Search/>
                    </Button>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="hover:bg-accent" onClick={() => {
                            createFormProps.reset();
                            eventSenders.resetState();
                        }}>
                            <Plus/>
                            Dodaj produkt
                        </Button>
                    </DialogTrigger>
                    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                        {addState === AddProductStates.NAME && (
                            <ProductNameInput {...eventSenders} {...createFormProps}/>
                        )}
                        {addState === AddProductStates.DATA && (
                            <ProductDataInput {...eventSenders} {...createFormProps}/>
                        )}
                        {addState === AddProductStates.CONFIRM && (
                            <Confirmation {...eventSenders} productName={watchCreateFormProps().name}
                                          onConfirm={addProduct}/>
                        )}
                        {addState === AddProductStates.SUCCESS && <SuccessPage/>}
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col gap-2 py-8">
                {data &&
                    data.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-row justify-between py-2.5 px-5 rounded bg-card h-16"
                        >
                            <div className="flex flex-row space-x-5">
                                <div className="content-center font-bold">ID: {product.id}</div>
                                <div className="content-center">{product.name}</div>
                            </div>

                            <div className="flex space-x-2.5">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="bg-secondary h-full hover:bg-accent"
                                                onClick={() => {
                                                    updateStockFormProps.reset();
                                                    updateStockEventSenders.resetState();
                                                }}>
                                            <ChartBarTwo/>
                                            Zarządzaj stanem
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                                        {updateStockState === UpdateStockStates.DEPOT && (
                                            <DepotPicker {...updateStockEventSenders} {...updateStockFormProps}/>
                                        )}
                                        {updateStockState === UpdateStockStates.STOCK && (
                                            <ChangeStock  {...updateStockEventSenders} {...updateStockFormProps}
                                                          onConfirm={() => updateStock(product.id)}
                                                          productId={product.id.toString()}
                                                          depotId={updateStockFormProps.watch().depot}

                                            />
                                        )}
                                        {updateStockState === UpdateStockStates.SUCCESS && <StockUpdateSuccess/>}
                                    </DialogContent>
                                </Dialog>
                                <ProductInfo productId={product.id}/>
                                <Button size="icon" className="bg-primary h-full hover:bg-accent">
                                    <CogFour/>
                                </Button>
                                <Button size="icon" className="bg-primary h-full hover:bg-accent">
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
