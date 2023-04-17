import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VariableHeadingBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VariableHeadingBlock {
        return new VariableHeadingBlock({...data, type: BLOCK_TYPES.HEADING_VARIABLE});
    }

    getSelectorAttributes() {
        return {
            class: 'variable',
        }
    }

    setStartingTextContent() {
        this.textContent = 'Nagłówek';
    }

    getStartingTagName() {
        return 'h1';
    }

}
