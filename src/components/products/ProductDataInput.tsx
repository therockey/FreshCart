import React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ArrowRight, Image} from "@mynaui/icons-react";

interface ProductDataInputProps {
    sendNext: () => void;
    sendBack: () => void;
}

export const ProductDataInput: React.FC<ProductDataInputProps> = ({sendNext, sendBack}) => {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Dane</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col justify-center space-y-4">
                <div className="flex flex-row space-x-2.5 justify-between">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="price">Cena</label>
                        <div className="flex flex-row space-x-2.5 content-center">
                            <Input type="number" id="price" step="0.01" min="0"/>
                            <div>zł</div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="Weight">Waga</label>
                        <div className="flex flex-row space-x-2.5">
                            <Input type="number" id="Weight" min="0"/>
                            <div>g</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="description">Opis</label>
                    <Input id="description"/>
                </div>
                <Button onClick={sendBack} className="bg-muted text-white">
                    <Image/>
                    Przekaż zdjęcie
                </Button>
                <Button onClick={sendNext}>
                    Dodaj produkt
                    <ArrowRight/>
                </Button>
            </div>
        </>
    );
}