"use client";
import React from "react";
import { OrderStates } from "@/xstate/orderMachine";
import { AddressPicker } from "@/components/cart/checkout/AddressPicker";
import { PaymentPicker } from "@/components/cart/checkout/PaymentPicker";
import { SuccessPage } from "@/components/cart/checkout/SuccessPage";
import { Overview } from "@/components/cart/checkout/Overview";
import { useOrderPage } from "@/hooks/app/client/cart/order/useOrderPage";

const Page = () => {
  const {
    state,
    eventSenders,
    formProps,
    paymentFormProps,
    paymentMethod,
    setPaymentMethod,
  } = useOrderPage(1);
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

export default Page;
