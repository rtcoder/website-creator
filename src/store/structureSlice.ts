import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {BlockInterface} from "@/interfaces/Block.interface";
import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import {
    dropBlockFn,
    dropNewBlockFn,
    moveDownBlockFn,
    moveUpBlockFn,
    removeBlockFn,
    setRwdModeFn,
    setSelectedBlockFn,
    setStructureFn,
    setStyleStateFn
} from "@/store/functions/structure";
import {
    duplicateBlockFn,
    setAttributesFn,
    setIconFn,
    setLinkFn,
    setStylesPropertyFn,
    setTagNameFn,
    setTextContentFn
} from "@/store/functions/block";
import {addHiddenBlockIdToArrayFn, removeHiddenBlockIdFromArrayFn} from "@/store/functions/structure-preview";
import {setPageYOffsetFn} from "@/store/functions/window";

export interface StructureState {
    structure: BlockInterface[];
    selectedBlock: BlockInterface | null;
    rwdMode: RWD_MODES;
    styleState: STYLE_STATE_NAMES;
    hiddenBlocksIds: string[];
    pageYOffset: number[];
}

const initialState: StructureState = {
    structure: [],
    selectedBlock: null,
    rwdMode: RWD_MODES.DESKTOP,
    styleState: STYLE_STATE_NAMES.BASIC,
    hiddenBlocksIds: [],
    pageYOffset: [0],
};

const structureSlice = createSlice({
    name: 'structure',
    initialState,
    reducers: {
        setStructure: setStructureFn,
        setSelectedBlock: setSelectedBlockFn,
        setRwdMode: setRwdModeFn,
        setStyleState: setStyleStateFn,
        dropBlock: dropBlockFn,
        dropNewBlock: dropNewBlockFn,
        duplicateBlock: duplicateBlockFn,
        removeBlock: removeBlockFn,
        setIcon: setIconFn,
        setTextContent: setTextContentFn,
        setAttributes: setAttributesFn,
        addHiddenBlockIdToArray: addHiddenBlockIdToArrayFn,
        removeHiddenBlockIdFromArray: removeHiddenBlockIdFromArrayFn,
        setStylesProperty: setStylesPropertyFn,
        setPageYOffset: setPageYOffsetFn,
        setTagName: setTagNameFn,
        setLink: setLinkFn,
        moveUpBlock: moveUpBlockFn,
        moveDownBlock: moveDownBlockFn,
    }
});

export const {
    setStructure,
    setSelectedBlock,
    setRwdMode,
    setStyleState,
    dropBlock,
    dropNewBlock,
    duplicateBlock,
    removeBlock,
    setIcon,
    setTextContent,
    setAttributes,
    addHiddenBlockIdToArray,
    removeHiddenBlockIdFromArray,
    setStylesProperty,
    setPageYOffset,
    setTagName,
    setLink,
    moveUpBlock,
    moveDownBlock,
}: { [k: string]: (action: any) => AnyAction } = structureSlice.actions;

export default structureSlice.reducer;
