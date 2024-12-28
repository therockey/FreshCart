import React from "react";
import {Button} from "@/components/ui/button";
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ArrowRight} from "@mynaui/icons-react";
import {Input} from "@/components/ui/input";

interface ProductNameInputProps {
    sendNext: () => void;
    sendBack: () => void;
}

export const ProductNameInput: React.FC<ProductNameInputProps> = ({sendNext, sendBack}) => {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Nazwa produktu</DialogTitle>
            </DialogHeader>
            <Input placeholder="Proszę podać nazwę produktu"/>
            <Button onClick={sendNext}>
                Przejdź dalej
                <ArrowRight/>
            </Button>
        </>
    );
}