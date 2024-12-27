import React from "react";
import {Button} from "@/components/ui/button";
import {DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";

interface ProductNameInputProps {
    sendNext: () => void;
    sendBack: () => void;
}

export const ProductNameInput: React.FC<ProductNameInputProps> = ({sendNext, sendBack}) => {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <h1>Product Name Input</h1>
            <Button onClick={sendNext} className="ml-2">
                Next
            </Button>
        </>
    );
}