import {StructureState} from "@/store/structureSlice";
import {duplicateBlk, findByIdRecursive, updateBlockInStructure} from "@/helpers/block";
import {BlockInterface, BlockSettingsIconInterface} from "@/interfaces/Block.interface";
import {PayloadAction} from "@reduxjs/toolkit";

const updateBlockIcon = (block: BlockInterface, icon: BlockSettingsIconInterface): BlockInterface => ({
    ...block,
    settings: {
        ...block.settings,
        icon
    }
})
export const setIconFn = (state: StructureState, {payload}) => {
    const {icon, blockId} = payload;
    const {structure, selectedBlock} = state;
    const block = findByIdRecursive(structure, blockId);
    if (!block) {
        return;
    }
    const blockWithNewIcon = updateBlockIcon(block, icon);
    state.structure = updateBlockInStructure(structure, blockId, blockWithNewIcon);
    if (selectedBlock && selectedBlock.id === blockId) {
        state.selectedBlock = updateBlockIcon(selectedBlock, icon);
    }
};


export const setTextContentFn = (state: StructureState, {payload}) => {
    const {content, blockId} = payload;
    const {structure, selectedBlock} = state;
    const block = findByIdRecursive(structure, blockId);
    if (!block) {
        return;
    }
    block.textContent = content;

    state.structure = updateBlockInStructure(structure, blockId, block);
    if (selectedBlock && selectedBlock.id === blockId) {
        selectedBlock.textContent = content
        state.selectedBlock = selectedBlock;
    }
};


export const setAttributesFn = (state: StructureState, {payload}) => {
    const {attributes, blockId} = payload;
    console.log(payload)
    const {structure, selectedBlock} = state;
    const block = findByIdRecursive(structure, blockId);
    if (!block) {
        return;
    }
    block.attributes = {
        ...block.attributes,
        ...attributes
    }

    state.structure = updateBlockInStructure(structure, blockId, block);
    if (selectedBlock && selectedBlock.id === blockId) {
        selectedBlock.attributes = {
            ...selectedBlock.attributes,
            ...attributes
        }
        state.selectedBlock = selectedBlock;
    }
};


export const duplicateBlockFn = (state: StructureState, {payload}: PayloadAction<BlockInterface>) => {
    console.log(payload)
    const {structure, selectedBlock} = state;

    state.structure = duplicateBlk(structure, payload.id);
};

