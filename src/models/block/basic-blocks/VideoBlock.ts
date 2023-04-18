import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VideoBlock extends BlockModel {
    changeButtonTitle = 'Zmień wideo';

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VideoBlock {
        return new VideoBlock({...data, type: BLOCK_TYPES.VIDEO});
    }

    getStartingTagName() {
        return 'video';
    }
}
