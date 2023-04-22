import {BlockInterface} from "@/interfaces/Block.interface";
import {STYLE_STATE_NAMES} from "@/enums/styleState";

export interface BlockProps {
    block: BlockInterface;
    selectedBlock: BlockInterface | null;
}
