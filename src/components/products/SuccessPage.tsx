import React from "react";
import {DialogClose, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface SuccessPageProps {
    prompt: string;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({prompt}) => {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Sukces</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col content-center space-y-4">
                <h1>{prompt}</h1>
                <DialogClose asChild>
                    <Button className="hover:bg-accent">Ok</Button>
                </DialogClose>
            </div>
        </>
    );
}