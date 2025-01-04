import React from "react";
import {DialogClose, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationProps {
    sendNext: () => void;
    sendBack: () => void;
    onConfirm: () => void;
    productName: string;
}

export const Confirmation: React.FC<ConfirmationProps> = ({
                                                              sendNext,
                                                              onConfirm,
                                                              productName,
                                                          }) => {
    const confirm = () => {
        onConfirm();
        sendNext();
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Potwierdzenie</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col justify-center content-center space-y-4 px-10">
                <div className="w-fit font-bold">
                    Czy na pewno chcesz dodać produkt:
                </div>
                <div className="w-fit">
                    {productName}
                </div>
                <div className="flex flex-row justify-between">
                    <DialogClose asChild>
                        <Button variant="outline" className="hover:bg-accent w-40">
                            Anuluj
                        </Button>
                    </DialogClose>
                    <Button onClick={confirm} className="w-40 hover:bg-accent">
                        Dodaj produkt
                    </Button>
                </div>
            </div>
        </>
    );
};