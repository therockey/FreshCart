import { useMachine } from "@xstate/react";
import { orderMachine } from "@/xstate/orderMachine";
import { addProductMachine } from "@/xstate/addProductMachine";

export enum MachineType {
  ORDER = "order",
  ADD_PRODUCT = "addProduct",
}

export const useCustomMachine = (machineType: MachineType) => {
  let machine;
  switch (machineType) {
    case MachineType.ORDER:
      machine = orderMachine;
      break;
    case MachineType.ADD_PRODUCT:
      machine = addProductMachine;
      break;
  }
  const [state, send] = useMachine(machine);
  return {
    state: state.value,
    sendBack: () => send({ type: "BACK" }),
    sendNext: () => send({ type: "NEXT" }),
  };
};
