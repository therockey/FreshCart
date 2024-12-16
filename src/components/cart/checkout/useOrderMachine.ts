import { useMachine } from "@xstate/react";
import { orderMachine } from "./orderMachine";

export const useOrderMachine = () => {
  const [state, send] = useMachine(orderMachine);
  return {
    state: state.value,
    sendBack: () => send({ type: "BACK" }),
    sendNext: () => send({ type: "NEXT" }),
  };
};
