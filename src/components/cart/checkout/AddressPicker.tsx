"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressPickerProps {
  sendNext: () => void;
  sendBack: () => void;
  handleSubmit: (callback: (data: any) => void) => (e: React.BaseSyntheticEvent) => void;
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
    if (!data.street || !data.city || !data.zip) {
      // Handle Error
    } else {
      sendNext();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddress)}>
      <div className="my-4">
        <Label>Street</Label>
        <Input
          {...register("street", {
            required: "Street is required",
          })}
        />
        {errors.street && (
          <p className="text-red-500 text-sm mt-1">Street is required</p>
        )}
      </div>
      <div className="my-4">
        <Label>City</Label>
        <Input
          {...register("city", {
            required: "City is required",
          })}
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">City is required</p>
        )}
      </div>
      <div className="my-4">
        <Label>ZIP Code</Label>
        <Input
          {...register("zip", {
            required: "ZIP Code is required",
          })}
        />
        {errors.zip && (
          <p className="text-red-500 text-sm mt-1">ZIP Code is required</p>
        )}
      </div>
      <Button type="button" onClick={sendBack} variant="outline">
        Back
      </Button>
      <Button type="submit" className="ml-2">
        Next
      </Button>
    </form>
  );
};
