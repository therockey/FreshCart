import React from "react";
import {DialogClose, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

export const StockUpdateSuccess: React.FC = () => {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Sukces</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col content-center space-y-4">
                <h1>Stan magazynowy zaktualizowany!</h1>
                <DialogClose asChild>
                    <Button>Ok</Button>
                </DialogClose>
            </div>
        </>
    );
}