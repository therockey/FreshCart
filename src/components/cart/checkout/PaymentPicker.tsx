"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { CustomFormField } from "@/components/commons/CustomFormField";
import { PaymentMethodButton } from "./PaymentMethodButton";
export enum PaymentMethods {
  CREDIT_CARD = "Kart płatnicza",
  BLIK = "BLIK",
  BANK_TRANSFER = "Przelew bankowy",
}

interface PaymentPickerProps {
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
  paymentMethod: PaymentMethods;
  setPaymentMethod: (method: PaymentMethods) => void;
}

export const PaymentPicker: React.FC<PaymentPickerProps> = ({
  sendNext,
  sendBack,
  handleSubmit,
  reset,
  register,
  formState: { errors },
  paymentMethod,
  setPaymentMethod,
}) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handlePayment = (data: any) => {
    if (!paymentMethod) {
      setErrorMessage("Please select a payment method.");
      return;
    }
    setErrorMessage(null); // Clear the error if any
    sendNext();
  };

  const handlePaymentMethodChange = (method: PaymentMethods) => {
    setPaymentMethod(method);
    reset(); // Clear all form fields when the payment method changes
  };
  return (
    <form onSubmit={handleSubmit(handlePayment)}>
      <h2 className="text-2xl text-center font-bold mb-4">
        Wybierz metodę płatności
      </h2>
      <div className="my-4 flex justify-center gap-[10%]  ">
        <PaymentMethodButton
          label={PaymentMethods.CREDIT_CARD}
          onClick={() => handlePaymentMethodChange(PaymentMethods.CREDIT_CARD)}
          selected={paymentMethod === PaymentMethods.CREDIT_CARD}
        />
        <PaymentMethodButton
          label={PaymentMethods.BLIK}
          onClick={() => handlePaymentMethodChange(PaymentMethods.BLIK)}
          selected={paymentMethod === PaymentMethods.BLIK}
        />
        <PaymentMethodButton
          label={PaymentMethods.BANK_TRANSFER}
          onClick={() =>
            handlePaymentMethodChange(PaymentMethods.BANK_TRANSFER)
          }
          selected={paymentMethod === PaymentMethods.BANK_TRANSFER}
        />
      </div>

      {/* Show error message if no payment method is selected */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {paymentMethod === PaymentMethods.CREDIT_CARD && (
        <div>
          <CustomFormField
            label="Numer karty"
            errorMessage={
              errors.cardNumber?.message && "Nieprawidłowy numer karty"
            }
            inputProps={register("payment", {
              required: "Numer karty jest wymagany",
              pattern: {
                // value: /^[0-9]{16}$/,
                message: "Nieprawidłowy numer karty",
              },
            })}
          />
          <CustomFormField
            label="Data ważności"
            errorMessage={
              errors.expiry?.message && "Data ważności jest wymagana"
            }
            inputProps={register("expiry", {
              required: "Data ważności jest wymagana",
            })}
          />
          <CustomFormField
            label="Właściciel karty"
            errorMessage={
              errors.owner?.message && "Właściciel karty jest wymagany"
            }
            inputProps={register("owner", {
              required: "Właściciel karty jest wymagany",
            })}
          />
          <CustomFormField
            label="CVV"
            errorMessage={errors.cvv?.message && "Nieprawidłowy CVV"}
            inputProps={register("cvv", {
              required: "CVV jest wymagany",
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: "Nieprawidłowy CVV",
              },
            })}
          />
        </div>
      )}

      {paymentMethod === PaymentMethods.BLIK && (
        <CustomFormField
          label="Kod BLIK"
          errorMessage={errors.expiry?.message && "Kod BLIK jest wymagany"}
          inputProps={register("payment", {
            required: "Kod BLIK jest wymagany",
          })}
        />
      )}

      {paymentMethod === PaymentMethods.BANK_TRANSFER && (
        <p className="my-4">Bank details will be shared on the next step.</p>
      )}

      <div className="flex justify-center p-5 gap-5">
        <Button type="button" onClick={sendBack} variant="outline">
          Back
        </Button>
        <Button type="submit" className="ml-2">
          Next
        </Button>
      </div>
    </form>
  );
};
