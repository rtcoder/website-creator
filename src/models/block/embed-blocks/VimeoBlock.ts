import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VimeoBlock extends BlockModel {

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VimeoBlock {
        return new VimeoBlock({...data, type: BLOCK_TYPES.VIMEO});
    }

    getStartingAttributes() {
        return {
            src: '',
            frameborder: '0',
            allow: 'autoplay; fullscreen; picture-in-picture',
            allowfullscreen: ''
        }
    }
}

