import {StructureState} from "@/store/structureSlice";
import {
    addNewBlockAtIndex,
    findIndexById,
    getBlockParent,
    moveBlock,
    removeRecursive,
    updateBlockInStructure
} from "@/helpers/block";
import {makeBlock} from "@/helpers/block-type-helpers";
import {PayloadAction} from "@reduxjs/toolkit";
import {BlockInterface} from "@/interfaces/Block.interface";
import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import {arrayMove} from "@/helpers/array";

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

export const setStyleStateFn = (state: StructureState, {payload}: PayloadAction<STYLE_STATE_NAMES>) => {
    state.styleState = payload || STYLE_STATE_NAMES.BASIC;
}

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
export const moveUpBlockFn = (state: StructureState, {payload}: PayloadAction<BlockInterface>) => {
    const {structure} = state;
    const parent = getBlockParent(structure, payload.id);
    if (parent) {
        const index = findIndexById(parent.children, payload.id);
        const nextIndex = index - 1;
        parent.children = arrayMove(parent.children, index, nextIndex);
        state.structure = updateBlockInStructure(structure, parent.id, parent);
        return;
    }

    const index = findIndexById(structure, payload.id);
    const nextIndex = index - 1;
    state.structure = arrayMove(structure, index, nextIndex);
}
export const moveDownBlockFn = (state: StructureState, {payload}: PayloadAction<BlockInterface>) => {
    const {structure} = state;
    const parent = getBlockParent(structure, payload.id);
    if (parent) {
        const index = findIndexById(parent.children, payload.id);
        const nextIndex = index + 1;
        parent.children = arrayMove(parent.children, index, nextIndex);
        state.structure = updateBlockInStructure(structure, parent.id, parent);
        return;
    }

    const index = findIndexById(structure, payload.id);
    const nextIndex = index + 1;
    state.structure = arrayMove(structure, index, nextIndex);
}
