import {StructureState} from "@/store/structureSlice";
import {duplicateBlk, findByIdRecursive, updateBlockInStructure} from "@/helpers/block";
import {BlockInterface, BlockSettingsIconInterface} from "@/interfaces/Block.interface";
import {PayloadAction} from "@reduxjs/toolkit";
import {setStyleValue} from "@/helpers/block-styles";
import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import {toKebabCase} from "@/helpers/string-helpers";

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
    const {structure} = state;

    state.structure = duplicateBlk(structure, payload.id);
};

export interface SetStylesPropertyPayloadInterface {
    property: string;
    value: string | null;
    rwd: RWD_MODES;
    styleState: STYLE_STATE_NAMES;
    blockId: string;
}

export const setStylesPropertyFn = (state: StructureState, {payload}: PayloadAction<SetStylesPropertyPayloadInterface>) => {
    const {property, value, rwd, styleState, blockId} = payload;
    const {structure, selectedBlock} = state;
    const block = findByIdRecursive(structure, blockId);
    if (!block) {
        return;
    }
    block.styles = setStyleValue(block.styles, rwd, styleState, toKebabCase(property), value);

    state.structure = updateBlockInStructure(structure, blockId, block);
    if (selectedBlock && selectedBlock.id === blockId) {
        selectedBlock.styles = setStyleValue(selectedBlock.styles, rwd, styleState, toKebabCase(property), value);
        state.selectedBlock = selectedBlock;
    }
};

export const setTagNameFn = (state: StructureState, {payload}) => {
    const {tagName, blockId} = payload;
    const {structure, selectedBlock} = state;
    const block = findByIdRecursive(structure, blockId);
    if (!block) {
        return;
    }
    block.tagName = tagName;
    state.structure = updateBlockInStructure(structure, blockId, block);
    if (selectedBlock && selectedBlock.id === blockId) {
        selectedBlock.tagName = tagName;
        state.selectedBlock = selectedBlock;
    }
};

export const setLinkFn = (state: StructureState, {payload}) => {
    const {link, blockId} = payload;
    const {structure, selectedBlock} = state;
    const block = findByIdRecursive(structure, blockId);
    if (!block) {
        return;
    }
    block.blockLink = link;
    state.structure = updateBlockInStructure(structure, blockId, block);
    if (selectedBlock && selectedBlock.id === blockId) {
        selectedBlock.blockLink = link;
        state.selectedBlock = selectedBlock;
    }
};
