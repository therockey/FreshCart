"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export enum PaymentMethods {
    CREDIT_CARD = "Credit Card",
    PAYPAL = "PayPal",
    BANK_TRANSFER = "Bank Transfer",
  }
  
interface PaymentPickerProps {
  sendNext: () => void;
  sendBack: () => void;
  handleSubmit: (callback: (data: any) => void) => (e: React.BaseSyntheticEvent) => void;
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
  register,
  formState: { errors },
  paymentMethod,
  setPaymentMethod,
}) => {
  const handlePayment = (data: any) => {
    if (
      paymentMethod === PaymentMethods.CREDIT_CARD &&
      (!data.cardNumber || !data.expiry || !data.cvv)
    ) {
      // Handle Error
    } else {
      sendNext();
    }
  };

  return (
    <form onSubmit={handleSubmit(handlePayment)}>
      <div className="my-4">
        <Label>Payment Method</Label>
        <select
          className="block w-full mt-1 border-gray-300 rounded-md"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethods)}
        >
          <option value={PaymentMethods.CREDIT_CARD}>
            {PaymentMethods.CREDIT_CARD}
          </option>
          <option value={PaymentMethods.PAYPAL}>
            {PaymentMethods.PAYPAL}
          </option>
          <option value={PaymentMethods.BANK_TRANSFER}>
            {PaymentMethods.BANK_TRANSFER}
          </option>
        </select>
      </div>

      {paymentMethod === PaymentMethods.CREDIT_CARD && (
        <>
          <div className="my-4">
            <Label>Card Number</Label>
            <Input
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: "Invalid card number",
                },
              })}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">Invalid card number</p>
            )}
          </div>
          <div className="my-4">
            <Label>Expiry Date</Label>
            <Input
              type="month"
              {...register("expiry", {
                required: "Expiry date is required",
              })}
            />
            {errors.expiry && (
              <p className="text-red-500 text-sm mt-1">Expiry date is required</p>
            )}
          </div>
          <div className="my-4">
            <Label>CVV</Label>
            <Input
              {...register("cvv", {
                required: "CVV is required",
                pattern: {
                  value: /^[0-9]{3,4}$/,
                  message: "Invalid CVV",
                },
              })}
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">Invalid CVV</p>
            )}
          </div>
        </>
      )}

      {paymentMethod === PaymentMethods.PAYPAL && (
        <p className="my-4">You will be redirected to PayPal.</p>
      )}

      {paymentMethod === PaymentMethods.BANK_TRANSFER && (
        <p className="my-4">Bank details will be shared on the next step.</p>
      )}

      <Button type="button" onClick={sendBack} variant="outline">
        Back
      </Button>
      <Button type="submit" className="ml-2">
        Next
      </Button>
    </form>
  );
};
