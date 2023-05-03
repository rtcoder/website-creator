import {StructureState} from "@/store/structureSlice";

export const setPageYOffsetFn = (state: StructureState, {payload}) => {
    state.pageYOffset = [payload]
};
