import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BlockInterface} from "@/interfaces/Block.interface";
import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import {
    dropBlockFn,
    dropNewBlockFn, removeBlockFn,
    setRwdModeFn,
    setSelectedBlockFn,
    setStructureFn
} from "@/store/functions/structure";
import {duplicateBlockFn, setAttributesFn, setIconFn, setTextContentFn} from "@/store/functions/block";

export interface StructureState {
    structure: BlockInterface[];
    selectedBlock: BlockInterface | null;
    rwdMode: RWD_MODES;
    styleState: STYLE_STATE_NAMES;
}

const initialState: StructureState = {
    structure: [],
    selectedBlock: null,
    rwdMode: RWD_MODES.DESKTOP,
    styleState: STYLE_STATE_NAMES.BASIC,
};

const structureSlice = createSlice({
    name: 'structure',
    initialState,
    reducers: {
        setStructure: setStructureFn,
        setSelectedBlock: setSelectedBlockFn,
        setRwdMode: setRwdModeFn,
        dropBlock: dropBlockFn,
        dropNewBlock: dropNewBlockFn,
        duplicateBlock: duplicateBlockFn,
        removeBlock: removeBlockFn,
        setIcon: setIconFn,
        setTextContent: setTextContentFn,
        setAttributes:setAttributesFn,
    }
});

export const {
    setStructure,
    setSelectedBlock,
    setRwdMode,
    dropBlock,
    dropNewBlock,
    duplicateBlock,
    removeBlock,
    setIcon,
    setTextContent,
    setAttributes,
}: { [k: string]: (action: PayloadAction) => AnyAction } = structureSlice.actions;

export default structureSlice.reducer;
