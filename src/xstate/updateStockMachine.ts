import { createMachine } from "xstate";

export enum UpdateStockStates {
    DEPOT = "depot",
    STOCK = "stock",
    SUCCESS = "success",
    EXIT = "exit",
}

export const updateStockMachine = createMachine({
    id: "updateStock",
    initial: UpdateStockStates.DEPOT,
    states: {
        [UpdateStockStates.DEPOT]: {
            on: {
                NEXT: UpdateStockStates.STOCK,
                BACK: UpdateStockStates.EXIT,
            },
        },
        [UpdateStockStates.STOCK]: {
            on: {
                BACK: UpdateStockStates.DEPOT,
                NEXT: UpdateStockStates.SUCCESS,
            },
        },
        [UpdateStockStates.SUCCESS]: {
            type: "final",
        },
        [UpdateStockStates.EXIT]: {
            type: "final",
        },
    },
});