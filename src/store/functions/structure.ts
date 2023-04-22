import {StructureState} from "@/store/structureSlice";
import {addNewBlockAtIndex, moveBlock} from "@/helpers/block";
import {makeBlock} from "@/helpers/block-type-helpers";

export const setStructureFn = (state: StructureState, {payload}) => {
    state.structure = payload;
};

export const setSelectedBlockFn = (state: StructureState, {payload}) => {
    if (payload.force) {
        state.selectedBlock = payload.block;
    } else {
        state.selectedBlock = state.selectedBlock?.id === payload.block.id
            ? null
            : payload.block;
    }
};

export const setRwdModeFn = (state: StructureState, {payload}) => {
    state.rwdMode = payload;
};

export const dropBlockFn = (state: StructureState, {payload}) => {
    const {block, targetId} = payload;
    const {structure} = state;
    state.structure = moveBlock(structure, block.id, targetId, null);
};
export const dropNewBlockFn = (state: StructureState, {payload}) => {
    console.log(payload)
    const {block, targetId} = payload;
    const {structure} = state;
    const newBlock = makeBlock(block);
    state.structure = addNewBlockAtIndex(structure, newBlock, targetId!, null);

    state.selectedBlock=newBlock;
};
