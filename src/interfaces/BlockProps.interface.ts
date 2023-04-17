import {BlockInterface} from "@/interfaces/Block.interface";
import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";

export interface BlockProps {
    block: BlockInterface;
    rwdMode: RWD_MODES;
    styleState: STYLE_STATE_NAMES;
    selectedBlock: BlockInterface | null;
}
