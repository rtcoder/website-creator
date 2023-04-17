import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class IframeBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): IframeBlock {
        return new IframeBlock({...data, type: BLOCK_TYPES.IFRAME});
    }

    getSelectorAttributes() {
        return {
            ...this.getStartingAttributes(),
            src: this.attributes.src ?? '',
        }
    }

    getStartingAttributes() {
        return {
            src: '',
            frameborder: '0',
        }
    }
}

