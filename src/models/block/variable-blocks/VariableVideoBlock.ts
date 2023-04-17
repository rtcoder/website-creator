import {VariableBlock} from "@/models/VariableBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class VariableVideoBlock extends VariableBlock {
    type = BLOCK_TYPES.VIDEO_VARIABLE;

    getSelectorAttributes() {
        return {
            src: '',
            poster: '/img/video-placeholder.png',
            controls: '',
        }
    }

    getStartingTagName() {
        return 'video';
    }

}
