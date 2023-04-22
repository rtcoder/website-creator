import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BlockInterface} from "@/interfaces/Block.interface";
import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import {
    dropBlockFn,
    dropNewBlockFn,
    setRwdModeFn,
    setSelectedBlockFn,
    setStructureFn
} from "@/store/functions/structure";
import {setIconFn, setTextContentFn} from "@/store/functions/block";

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
        setIcon: setIconFn,
        setTextContent: setTextContentFn,
    }
});

export const {
    setStructure,
    setSelectedBlock,
    setRwdMode,
    dropBlock,
    dropNewBlock,
    setIcon,
    setTextContent,
}: { [k: string]: (action: PayloadAction) => AnyAction } = structureSlice.actions;

export default structureSlice.reducer;
