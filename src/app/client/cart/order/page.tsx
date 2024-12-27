"use client";
import React, { useState } from "react";
import { OrderStates } from "@/xstate/orderMachine";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddressPicker } from "@/components/cart/checkout/AddressPicker";
import {
  PaymentMethods,
  PaymentPicker,
} from "@/components/cart/checkout/PaymentPicker";
import { SuccessPage } from "@/components/cart/checkout/SuccessPage";
import { Overview } from "@/components/cart/checkout/Overview";
import { MachineType, useCustomMachine } from "@/hooks/useCustomMachine";

const OrderProcess = () => {
  const { state, ...eventSenders } = useCustomMachine(MachineType.ORDER);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.CREDIT_CARD
  );
  const formProps = useForm();
  const paymentFormProps = useForm();

  return (
    <div className="p-6 w-[1200px] bg-black">
      <Card>
        <CardHeader>
          <CardTitle>{state as string}</CardTitle>
        </CardHeader>
        <CardContent>
          {state === OrderStates.OVERVIEW && (
            <>
              <Overview {...eventSenders} />
            </>
          )}

          {state === OrderStates.ADDRESS && (
            <AddressPicker {...eventSenders} {...formProps} />
          )}

          {state === OrderStates.PAYMENT && (
            <PaymentPicker
              {...eventSenders}
              {...paymentFormProps}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          )}

          {state === OrderStates.SUCCESS && <SuccessPage />}
          {state === OrderStates.EXIT && <p>Process Exited</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderProcess;
