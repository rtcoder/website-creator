import {VariableBlock} from "@/models/VariableBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class VariableParagraphBlock extends VariableBlock {
    type = BLOCK_TYPES.PARAGRAPH_VARIABLE;

    getContentHtml() {
        return this.generateSelector(true, `Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit. Donec facilisis eros posuere erat aliquet mattis facilisis rutrum.`);
    }

    getSelectorAttributes() {
        return {
            class: 'variable',
        }
    }

    setStartingTextContent() {
        this.textContent = 'Paragraf';
    }

    getStartingTagName() {
        return 'p';
    }
}
