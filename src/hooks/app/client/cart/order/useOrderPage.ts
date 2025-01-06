import { useEffect, useState } from "react";

import { MachineType, useCustomMachine } from "@/hooks/useCustomMachine";
import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "@/api/CustomerFetch";
import { useForm } from "react-hook-form";
import { PaymentMethods } from "@/components/cart/checkout/PaymentPicker";
import { OrderStates } from "@/xstate/orderMachine";
import { useRouter } from "next/navigation";
export const useOrderPage = (userId: number) => {
  const { push } = useRouter();
  const { state, ...eventSenders } = useCustomMachine(MachineType.ORDER);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>(
    PaymentMethods.CREDIT_CARD
  );
  const formProps = useForm();
  const paymentFormProps = useForm();
  const { watch: watchFormProps } = formProps;
  const { watch: watchPaymentFormProps } = paymentFormProps;
  const mutationFn = async (address: string) => {
    const data = await placeOrder(userId, address)();
    return data;
  };
  const { mutate } = useMutation({
    mutationFn,
  });
  useEffect(() => {
    console.log(state);
    if (state === OrderStates.SUCCESS) {
      mutate(JSON.stringify(watchFormProps()));
    }
    if (state === OrderStates.OVERVIEW) {
      push("/client/cart");
    }
  }, [state]);
  return {
    state,
    eventSenders,
    formProps,
    paymentFormProps,
    paymentMethod,
    setPaymentMethod,
  };
};
