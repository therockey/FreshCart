import { createMachine } from "xstate";

export enum AddProductStates {
  NAME = "name",
  DATA = "data",
  CONFIRM = "confirm",
  SUCCESS = "success",
  EXIT = "exit",
}

export const addProductMachine = createMachine({
  id: "addProduct",
  initial: AddProductStates.NAME,
  states: {
    [AddProductStates.NAME]: {
      on: {
        NEXT: AddProductStates.DATA,
        BACK: AddProductStates.EXIT,
      },
    },
    [AddProductStates.DATA]: {
      on: {
        BACK: AddProductStates.NAME,
        NEXT: AddProductStates.CONFIRM,
      },
    },
    [AddProductStates.CONFIRM]: {
      on: {
        BACK: AddProductStates.DATA,
        NEXT: AddProductStates.SUCCESS,
      },
    },
    [AddProductStates.SUCCESS]: {
      type: "final",
    },
    [AddProductStates.EXIT]: {
      type: "final",
    },
  },
});
