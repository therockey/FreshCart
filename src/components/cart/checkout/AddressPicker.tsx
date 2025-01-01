import React from "react";
import { Button } from "@/components/ui/button";
import { CustomFormField } from "@/components/commons/CustomFormField";

interface AddressPickerProps {
  sendNext: () => void;
  sendBack: () => void;
  handleSubmit: (
    callback: (data: any) => void
  ) => (e: React.BaseSyntheticEvent) => void;
  register: any;
  formState: {
    errors: Record<string, any>;
  };
}

export const AddressPicker: React.FC<AddressPickerProps> = ({
  sendNext,
  sendBack,
  handleSubmit,
  register,
  formState: { errors },
}) => {
  const handleAddress = (data: any) => {
    sendNext();
  };

  return (
    <form onSubmit={handleSubmit(handleAddress)}>
      <div className="flex flex-col justify-center w-1/2">
        <div className="grid grid-cols-2 gap-10 ">
          <CustomFormField
            label="Nr domu i/lub lokalu"
            errorMessage={
              errors.number?.message && "Nie podano numeru domu i/lub lokalu"
            }
            inputProps={register("number", {
              required: "Nie podano numeru domu i/lub lokalu",
            })}
          />
          <CustomFormField
            label="Ulica"
            errorMessage={errors.street?.message && "Nie podano ulicy"}
            inputProps={register("street", {
              required: "Nie podano ulicy",
            })}
          />
          <CustomFormField
            label="Kod pocztowy"
            errorMessage={errors.zip?.message && "Nie podano kodu pocztowego"}
            inputProps={register("zip", {
              required: "Nie podano kodu pocztowego",
            })}
          />
          <CustomFormField
            label="Miejscowość"
            errorMessage={errors.city?.message && "Nie podano miejscowości"}
            inputProps={register("city", {
              required: "Nie podano miejscowości",
            })}
          />
          <CustomFormField
            label="Nr telefonu"
            errorMessage={errors.phone?.message && "Nie podano numeru telefonu"}
            inputProps={register("phone", {
              required: "Nie podano numeru telefonu",
            })}
            {...{ className: "col-span-2" }}
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button type="button" onClick={sendBack} variant="outline">
            Back
          </Button>
          <Button type="submit" className="ml-2">
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};
