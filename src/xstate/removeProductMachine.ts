import { createMachine } from "xstate";

export enum RemoveProductStates {
    CONFIRM = "confirm",
    SUCCESS = "success",
}

export const removeProductMachine = createMachine({
    id: "removeProduct",
    initial: RemoveProductStates.CONFIRM,
    states: {
        [RemoveProductStates.CONFIRM]: {
            on: {
                NEXT: RemoveProductStates.SUCCESS,
            },
        },
        [RemoveProductStates.SUCCESS]: {},
    },
    on: {
        RESET: `.${RemoveProductStates.CONFIRM}`,
    }
});
