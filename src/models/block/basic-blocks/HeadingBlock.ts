import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class HeadingBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): HeadingBlock {
        return new HeadingBlock({...data, type: BLOCK_TYPES.HEADING});
    }

    setStartingTextContent() {
        this.textContent = 'Nagłówek';
    }

    getStartingTagName() {
        return 'h1';
    }
}
