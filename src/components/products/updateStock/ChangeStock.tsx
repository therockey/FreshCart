import React from "react";
import {Button} from "@/components/ui/button";
import {DialogClose, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Edit} from "@mynaui/icons-react";
import {CustomFormField} from "@/components/commons/CustomFormField";

interface ChangeStockProps {
    sendNext: () => void;
    sendBack: () => void;
    reset: () => void;
    handleSubmit: (
        callback: (data: any) => void
    ) => (e: React.BaseSyntheticEvent) => void;
    register: any;
    formState: {
        errors: Record<string, any>;
    };
    onConfirm: () => void;
}

export const ChangeStock: React.FC<ChangeStockProps> = ({
                                                            sendNext,
                                                            reset,
                                                            handleSubmit,
                                                            register,
                                                            formState: {errors},
                                                            onConfirm,
                                                        }) => {

    const handleStock = (data: any) => {
        if (!data.stock || data.stock <= 0) {
            return;
        }

        onConfirm();
        reset();
        sendNext();
    };

    return (
        <form onSubmit={handleSubmit(handleStock)} className="flex flex-col content-center justify-center gap-5">
            <DialogHeader>
                <DialogTitle className="text-2xl">Stan magazynowy</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col justify-center space-y-4 p-3 pt-1">
                <div className="flex flex-col space-y-0.5">
                    <div className="font-bold">Nazwa produktu</div>
                    <div className="text-2xl font-thin">Masło Ekstra osełka (pergamin) 82% tłuszczu 500g</div>
                </div>
                <div className="flex flex-col space-y-0.5">
                    <div className="font-bold">Magazyn</div>
                    <div className="text-2xl font-thin">Wrocław 1 (Graniczna 8B, 54-610 Wrocław)</div>
                </div>
                <div className="flex flex-col space-y-0.5">
                    <div className="font-bold">Aktualny stan magazynowy</div>
                    <div className="text-2xl font-thin">1238 szt.</div>
                </div>
                <div className="flex flex-row space-x-2.5  px-10">
                    <CustomFormField
                        className="w-full"
                        label="Podaj nowy stan magazynowy"
                        errorMessage={errors.stock?.message && "Stan magazynowy nie może być <= 0"}
                        inputProps={{
                            ...register("stock", {
                                required: "Stan magazynowy nie może być <= 0",
                            }),
                            type: "number",
                            min: "0",
                        }}
                    />
                    <div className="h-fit pt-7">szt.</div>
                </div>
                <div className="flex flex-row justify-between px-5">
                    <DialogClose asChild>
                        <Button className="bg-secondary hover:bg-accent w-40">
                            Anuluj
                        </Button>
                    </DialogClose>
                    <Button className="hover:bg-accent w-40" type="submit">
                        <Edit/>
                        Zapisz
                    </Button>
                </div>
            </div>
        </form>
    );
}