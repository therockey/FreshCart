import { createMachine } from "xstate";

export enum OrderStates {
  OVERVIEW = "overview",
  ADDRESS = "address",
  PAYMENT = "payment",
  SUCCESS = "success",
  EXIT = "exit",
}

export const orderMachine = createMachine({
  id: "order",
  initial: OrderStates.OVERVIEW,
  states: {
    [OrderStates.OVERVIEW]: {
      on: {
        NEXT: OrderStates.ADDRESS,
        BACK: OrderStates.EXIT,
      },
    },
    [OrderStates.ADDRESS]: {
      on: {
        BACK: OrderStates.OVERVIEW,
        NEXT: OrderStates.PAYMENT,
      },
    },
    [OrderStates.PAYMENT]: {
      on: {
        BACK: OrderStates.ADDRESS,
        NEXT: OrderStates.SUCCESS,
      },
    },
    [OrderStates.SUCCESS]: {
      type: "final",
    },
    [OrderStates.EXIT]: {
      type: "final",
    },
  },
});
