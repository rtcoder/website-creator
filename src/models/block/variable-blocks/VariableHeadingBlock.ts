import {VariableBlock} from "@/models/VariableBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class VariableHeadingBlock extends VariableBlock {
    type = BLOCK_TYPES.HEADING_VARIABLE;

    getContentHtml() {
        return this.generateSelector(true);
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
