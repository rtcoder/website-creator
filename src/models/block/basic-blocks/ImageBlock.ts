import {MediaUploadBlock} from "@/models/MediaUploadBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class ImageBlock extends MediaUploadBlock {
    type = BLOCK_TYPES.IMAGE;
    acceptType = 'image/*';
    addIcon = {name: 'add_photo_alternate', type: 'material-sharp'};

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
