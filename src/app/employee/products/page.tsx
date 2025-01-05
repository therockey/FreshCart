"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog";
import {Plus, Trash, CogFour, Search, ChartBarTwo} from "@mynaui/icons-react";
import React from "react";
import {AddProductStates} from "@/xstate/addProductMachine";
import {UpdateStockStates} from "@/xstate/updateStockMachine";
import {ProductNameInput} from "@/components/products/add/ProductNameInput";
import {ProductDataInput} from "@/components/products/add/ProductDataInput";
import {Confirmation} from "@/components/products/add/Confirmation";
import {DepotPicker} from "@/components/products/updateStock/DepotPicker";
import {SuccessPage} from "@/components/products/add/SuccessPage";
import {ChangeStock} from "@/components/products/updateStock/ChangeStock";
import {StockUpdateSuccess} from "@/components/products/updateStock/StockUpdateSuccess";
import {ProductInfo} from "@/components/products/ProductInfo";
import {useProductsPage} from "@/hooks/app/employee/products/useProductsPage";

const ProductsPage = () => {
    const {
        products,
        addProductDialogState,
        updateStockDialogState,
        addProductEventSenders,
        updateStockEventSenders,
        addProductFormProps,
        updateStockFormProps,
        addProduct,
        updateStock,
    } = useProductsPage();

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
                            addProductFormProps.reset();
                            addProductEventSenders.resetState();
                        }}>
                            <Plus/>
                            Dodaj produkt
                        </Button>
                    </DialogTrigger>
                    <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                        {addProductDialogState === AddProductStates.NAME && (
                            <ProductNameInput {...addProductEventSenders} {...addProductFormProps}/>
                        )}
                        {addProductDialogState === AddProductStates.DATA && (
                            <ProductDataInput {...addProductEventSenders} {...addProductFormProps}/>
                        )}
                        {addProductDialogState === AddProductStates.CONFIRM && (
                            <Confirmation {...addProductEventSenders} productName={addProductFormProps.watch().name}
                                          onConfirm={addProduct}/>
                        )}
                        {addProductDialogState === AddProductStates.SUCCESS && <SuccessPage/>}
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col gap-2 py-8">
                {products &&
                    products.map((product) => (
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
                                        {updateStockDialogState === UpdateStockStates.DEPOT && (
                                            <DepotPicker {...updateStockEventSenders} {...updateStockFormProps}/>
                                        )}
                                        {updateStockDialogState === UpdateStockStates.STOCK && (
                                            <ChangeStock  {...updateStockEventSenders} {...updateStockFormProps}
                                                          onConfirm={() => updateStock(product.id)}
                                                          productId={product.id.toString()}
                                                          depotId={updateStockFormProps.watch().depot}

                                            />
                                        )}
                                        {updateStockDialogState === UpdateStockStates.SUCCESS && <StockUpdateSuccess/>}
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
