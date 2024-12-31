import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationProps {
    sendNext: () => void;
    sendBack: () => void;
    onConfirm: () => void;
    productName: string;
}

export const Confirmation: React.FC<ConfirmationProps> = ({
                                                              sendNext,
                                                              sendBack,
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
                    <Button onClick={sendBack} variant="outline">
                        Anuluj
                    </Button>
                    <Button onClick={confirm}>
                        Dodaj produkt
                    </Button>
                </div>
            </div>
        </>
    );
};