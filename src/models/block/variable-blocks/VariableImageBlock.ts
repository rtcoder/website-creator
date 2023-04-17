import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VariableImageBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VariableImageBlock {
        return new VariableImageBlock({...data, type: BLOCK_TYPES.IMAGE_VARIABLE});
    }

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
