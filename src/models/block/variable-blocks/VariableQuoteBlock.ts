import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VariableQuoteBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VariableQuoteBlock {
        return new VariableQuoteBlock({...data, type: BLOCK_TYPES.QUOTE_VARIABLE});
    }

    getSelectorAttributes() {
        return {
            class: 'variable',
        }
    }

    setStartingTextContent() {
        this.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum venenatis libero,
                            vitae lacinia arcu ullamcorper a. Vivamus mattis pellentesque dolor quis venenatis.`;
    }

    getStartingTagName() {
        return 'q';
    }
}
