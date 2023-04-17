import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class AudioBlock extends BlockModel {
    acceptType = 'audio/*';
    changeButtonTitle = 'Zmień audio';
    addIcon = {name: 'audio_file', type: 'material-sharp'};

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): AudioBlock {
        return new AudioBlock({...data, type: BLOCK_TYPES.AUDIO});
    }

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
