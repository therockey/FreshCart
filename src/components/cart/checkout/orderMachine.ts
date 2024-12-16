import { createMachine } from "xstate";

export enum OrderStates {
  OVERVIEW = "overview",
  ADDRESS = "address",
  PAYMENT_ERROR = "payment_error",
  ADDRESS_ERROR = "address_error",
  PAYMENT = "payment",
  SUCCESS = "success",
  ERROR = "error",
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
        ERROR: {
          target: OrderStates.ADDRESS_ERROR,
        },
      },
    },
    [OrderStates.PAYMENT]: {
      on: {
        BACK: OrderStates.ADDRESS,
        NEXT: OrderStates.SUCCESS,
        ERROR: {
          target: OrderStates.PAYMENT_ERROR,
        },
      },
    },
    [OrderStates.ADDRESS_ERROR]: {
      on: {
        BACK: {
          target: OrderStates.ADDRESS,
        },
        NEXT: OrderStates.EXIT,
      },
    },
    [OrderStates.PAYMENT_ERROR]: {
      on: {
        BACK: {
          target: OrderStates.PAYMENT,
        },
        NEXT: OrderStates.EXIT,
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
