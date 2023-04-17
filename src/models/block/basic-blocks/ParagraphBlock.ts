import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class ParagraphBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): ParagraphBlock {
        return new ParagraphBlock({...data, type: BLOCK_TYPES.PARAGRAPH});
    }

    setStartingTextContent() {
        this.textContent = 'Paragraf';
    }

    getStartingTagName() {
        return 'p';
    }
}
