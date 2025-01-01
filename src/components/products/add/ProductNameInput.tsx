import React from "react";
import {Button} from "@/components/ui/button";
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ArrowRight} from "@mynaui/icons-react";
import {CustomFormField} from "@/components/commons/CustomFormField";

interface ProductNameInputProps {
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

export const ProductNameInput: React.FC<ProductNameInputProps> = ({
                                                                      sendNext,
                                                                      sendBack,
                                                                      reset,
                                                                      handleSubmit,
                                                                      register,
                                                                      formState: {errors},
                                                                  }) => {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const handleName = (data: any) => {
        if (!data.name) {
            setErrorMessage("Nazwa nie może być pusta");
            return;
        }
        setErrorMessage(null);
        sendNext();
    };

    return (
        <form onSubmit={handleSubmit(handleName)} className="flex flex-col content-center justify-center gap-3">
            <DialogHeader>
                <DialogTitle>Nazwa produktu</DialogTitle>
            </DialogHeader>
            <CustomFormField
                label="Nazwa produktu"
                errorMessage={errors.name?.message && "Nazwa nie może być pusta"}
                inputProps={register("name", {
                    required: "Nazwa nie może być pusta"
                })}
            />
            <Button type="submit">
                Przejdź dalej
                <ArrowRight/>
            </Button>
        </form>
    );
}