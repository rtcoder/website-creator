import {MediaUploadBlock} from "@/models/MediaUploadBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class AudioBlock extends MediaUploadBlock {
    type = BLOCK_TYPES.AUDIO;
    acceptType = 'audio/*';
    changeButtonTitle = 'Zmień audio';
    addIcon = {name: 'audio_file', type: 'material-sharp'};

    getSelectorAttributes() {
        return {
            src: this.attributes.src ?? '',
            controls: '',
        }
    }

    getStartingTagName() {
        return 'audio';
    }
}
