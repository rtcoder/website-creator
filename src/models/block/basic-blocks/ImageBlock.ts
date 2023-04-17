import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class ImageBlock extends BlockModel {
    acceptType = 'image/*';
    addIcon = {name: 'add_photo_alternate', type: 'material-sharp'};

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): ImageBlock {
        return new ImageBlock({...data, type: BLOCK_TYPES.IMAGE});
    }

    getSelectorAttributes() {
        return {
            src: this.attributes.src ?? '',
            alt: 'image',
        }
    }

    getStartingTagName() {
        return 'img';
    }
}
