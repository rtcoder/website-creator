import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class YoutubeBlock extends BlockModel {

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): YoutubeBlock {
        return new YoutubeBlock({...data, type: BLOCK_TYPES.YOUTUBE});
    }

    getStartingAttributes() {
        return {
            src: '',
            frameborder: '0',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
            allowfullscreen: ''
        }
    }
}

