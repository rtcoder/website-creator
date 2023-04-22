import {StructureState} from "@/store/structureSlice";
import {addNewBlockAtIndex, moveBlock, removeRecursive} from "@/helpers/block";
import {makeBlock} from "@/helpers/block-type-helpers";
import {PayloadAction} from "@reduxjs/toolkit";
import {BlockInterface} from "@/interfaces/Block.interface";
import {RWD_MODES} from "@/enums/rwd";

interface SetSelectedBlockPayload {
    force: boolean;
    block: BlockInterface;
}

interface BlockWithTargetPayload {
    targetId: string | null;
    block: BlockInterface;
}

export const setStructureFn = (state: StructureState, {payload}: PayloadAction<BlockInterface[]>) => {
    state.structure = payload;
};

export const setSelectedBlockFn = (state: StructureState, {payload}: PayloadAction<SetSelectedBlockPayload>) => {
    if (payload.force) {
        state.selectedBlock = payload.block;
    } else {
        state.selectedBlock = state.selectedBlock?.id === payload.block.id
            ? null
            : payload.block;
    }
};

export const setRwdModeFn = (state: StructureState, {payload}: PayloadAction<RWD_MODES>) => {
    state.rwdMode = payload;
};

export const dropBlockFn = (state: StructureState, {payload}: PayloadAction<BlockWithTargetPayload>) => {
    const {block, targetId} = payload;
    const {structure} = state;
    state.structure = moveBlock(structure, block.id, targetId, null);
};
export const dropNewBlockFn = (state: StructureState, {payload}: PayloadAction<BlockWithTargetPayload>) => {
    const {block, targetId} = payload;
    const {structure} = state;
    const newBlock = makeBlock(block);
    state.structure = addNewBlockAtIndex(structure, newBlock, targetId, null);

    state.selectedBlock = newBlock;
};
export const removeBlockFn = (state: StructureState, {payload}: PayloadAction<BlockInterface>) => {
    const {structure, selectedBlock} = state;
    const result = removeRecursive(structure, payload.id);
    state.structure = result.newArray

    if (selectedBlock && selectedBlock.id === payload.id) {
        state.selectedBlock = null;
    }
};
