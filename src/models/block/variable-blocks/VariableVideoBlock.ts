import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VariableVideoBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VariableVideoBlock {
        return new VariableVideoBlock({...data, type: BLOCK_TYPES.VIDEO_VARIABLE});
    }

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
