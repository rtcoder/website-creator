import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class ImageBlock extends BlockModel {

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): ImageBlock {
        return new ImageBlock({...data, type: BLOCK_TYPES.IMAGE});
    }

    getStartingTagName() {
        return 'img';
    }
}
