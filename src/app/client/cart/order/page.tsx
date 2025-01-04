"use client";
import React, { useEffect, useState } from "react";
import { OrderStates } from "@/xstate/orderMachine";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressPicker } from "@/components/cart/checkout/AddressPicker";
import {
  PaymentMethods,
  PaymentPicker,
} from "@/components/cart/checkout/PaymentPicker";
import { SuccessPage } from "@/components/cart/checkout/SuccessPage";
import { Overview } from "@/components/cart/checkout/Overview";
import { MachineType, useCustomMachine } from "@/hooks/useCustomMachine";
import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "@/api/CustomerFetch";

const OrderProcess = () => {
  const { state, ...eventSenders } = useCustomMachine(MachineType.ORDER);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.CREDIT_CARD
  );
  const formProps = useForm();
  const paymentFormProps = useForm();
  const { watch: watchFormProps } = formProps;
  const { watch: watchPaymentFormProps } = paymentFormProps;
  const mutationFn = async (address: string) => {
    const data = await placeOrder("1", address)();
    return data;
  };
  const { mutate } = useMutation({
    mutationFn,
  });
  useEffect(() => {
    if (state === OrderStates.SUCCESS) {
      mutate(JSON.stringify(watchFormProps()));
    }
  }, [state]);
  return (
    <div className="p-4">
      {state === OrderStates.ADDRESS && (
        <AddressPicker {...eventSenders} {...formProps} />
      )}
      {state === OrderStates.OVERVIEW && <Overview {...eventSenders} />}

      {state === OrderStates.PAYMENT && (
        <PaymentPicker
          {...eventSenders}
          {...paymentFormProps}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      )}
      {state === OrderStates.SUCCESS && <SuccessPage />}
    </div>
  );
};

export default OrderProcess;
