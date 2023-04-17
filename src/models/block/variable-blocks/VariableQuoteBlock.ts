import {VariableBlock} from "@/models/VariableBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class VariableQuoteBlock extends VariableBlock {
    type = BLOCK_TYPES.QUOTE_VARIABLE;

    getContentHtml() {
        return this.generateSelector(true, `Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit. Nulla vestibulum venenatis libero, vitae lacinia arcu ullamcorper a. Vivamus
                                     mattis pellentesque dolor quis venenatis.`);
    }

    getSelectorAttributes() {
        return {
            class: 'variable',
        }
    }

    setStartingTextContent() {
        this.textContent = 'Cytat';
    }

    getStartingTagName() {
        return 'q';
    }
}
