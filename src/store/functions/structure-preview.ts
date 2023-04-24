import {StructureState} from "@/store/structureSlice";
import {PayloadAction} from "@reduxjs/toolkit";

export const addHiddenBlockIdToArrayFn = (state: StructureState, {payload}: PayloadAction<string>) => {
    state.hiddenBlocksIds.push(payload)
};
export const removeHiddenBlockIdFromArrayFn = (state: StructureState, {payload}: PayloadAction<string>) => {
    state.hiddenBlocksIds = state.hiddenBlocksIds.filter(id => id !== payload)
};
