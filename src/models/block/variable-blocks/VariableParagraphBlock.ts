import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VariableParagraphBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VariableParagraphBlock {
        return new VariableParagraphBlock({...data, type: BLOCK_TYPES.PARAGRAPH_VARIABLE});
    }

    getSelectorAttributes() {
        return {
            class: 'variable',
        }
    }

    setStartingTextContent() {
        this.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis eros posuere erat
                        aliquet mattis facilisis rutrum.`;
    }

    getStartingTagName() {
        return 'p';
    }
}
