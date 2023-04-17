import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class QuoteBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): QuoteBlock {
        return new QuoteBlock({...data, type: BLOCK_TYPES.QUOTE});
    }

    setStartingTextContent() {
        this.textContent = 'Cytat';
    }

    getStartingTagName() {
        return 'q';
    }
}
