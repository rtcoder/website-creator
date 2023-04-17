import {VariableBlock} from "@/models/VariableBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class VariableImageBlock extends VariableBlock {
    type = BLOCK_TYPES.IMAGE_VARIABLE;

    getSelectorAttributes() {
        return {
            src: '/img/placeholder.webp',
            alt: 'placeholder',
        }
    }

    getStartingTagName() {
        return 'img';
    }
}
