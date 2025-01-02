import { createMachine } from "xstate";

export enum UpdateStockStates {
    DEPOT = "depot",
    STOCK = "stock",
    SUCCESS = "success",
}

export const updateStockMachine = createMachine({
    id: "updateStock",
    initial: UpdateStockStates.DEPOT,
    states: {
        [UpdateStockStates.DEPOT]: {
            on: {
                NEXT: UpdateStockStates.STOCK,
            },
        },
        [UpdateStockStates.STOCK]: {
            on: {
                BACK: UpdateStockStates.DEPOT,
                NEXT: UpdateStockStates.SUCCESS,
            },
        },
        [UpdateStockStates.SUCCESS]: {},
    },
    on: {
        RESET: `.${UpdateStockStates.DEPOT}`,
    },
});