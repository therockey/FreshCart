import { createMachine } from "xstate";

export enum AddProductStates {
  NAME = "name",
  DATA = "data",
  CONFIRM = "confirm",
  SUCCESS = "success",
}

export const addProductMachine = createMachine({
  id: "addProduct",
  initial: AddProductStates.NAME,
  states: {
    [AddProductStates.NAME]: {
      on: {
        NEXT: AddProductStates.DATA,
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
    [AddProductStates.SUCCESS]: {},
  },
  on: {
    RESET: `.${AddProductStates.NAME}`,
  }
});
