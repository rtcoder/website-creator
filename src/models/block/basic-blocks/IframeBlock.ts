import {FrameBlock} from "@/models/FrameBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class IframeBlock extends FrameBlock {
    type = BLOCK_TYPES.IFRAME;

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

