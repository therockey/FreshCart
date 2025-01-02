import React from "react";
import {Button} from "@/components/ui/button";
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ArrowRight, Image} from "@mynaui/icons-react";
import {CustomFormField} from "@/components/commons/CustomFormField";

interface ProductDataInputProps {
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
}

export const ProductDataInput: React.FC<ProductDataInputProps> = ({
                                                                      sendNext,
                                                                      sendBack,
                                                                      reset,
                                                                      handleSubmit,
                                                                      register,
                                                                      formState: {errors},
                                                                  }) => {

    const handleData = (data: any) => {
        if (!data.price || data.price <= 0) {
            return;
        }

        if (!data.weight || data.weight <= 0) {
            return;
        }

        if (!data.description) {
            return;
        }

        sendNext();
    };

    return (
        <form onSubmit={handleSubmit(handleData)} className="flex flex-col content-center justify-center gap-3">
            <DialogHeader>
                <DialogTitle>Dane</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col justify-center space-y-4">
                <div className="flex flex-row space-x-2.5 justify-between">
                    <div className="flex flex-row space-x-2.5">
                        <CustomFormField
                            label="Cena"
                            errorMessage={errors.price?.message && "Cena nie może być <= 0"}
                            inputProps={{
                                ...register("price", {
                                    required: "Cena nie może być <= 0",
                                }),
                                type: "number",
                                step: "0.01",
                                min: "0",
                            }}
                        />
                        <div className="h-fit pt-7">zł</div>
                    </div>
                    <div className="flex flex-row space-x-2.5">
                        <CustomFormField
                            label="Waga"
                            errorMessage={errors.weight?.message && "Waga nie może być <= 0"}
                            inputProps={{
                                ...register("weight", {
                                    required: "Waga nie może być <= 0",
                                }),
                                type: "number",
                                min: "0",
                            }}
                        />
                        <div className="h-fit pt-7">g</div>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <CustomFormField
                        label="Opis"
                        errorMessage={errors.description?.message && "Opis nie może być pusty"}
                        inputProps={register("description", {
                            required: "Opis nie może być pusty"
                        })}
                    />
                </div>
                <Button onClick={sendBack} className="bg-muted text-white">
                    <Image/>
                    Przekaż zdjęcie
                </Button>
                <Button type="submit">
                    Dodaj produkt
                    <ArrowRight/>
                </Button>
            </div>
        </form>
    );
}