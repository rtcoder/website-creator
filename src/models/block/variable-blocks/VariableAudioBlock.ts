import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VariableAudioBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VariableAudioBlock {
        return new VariableAudioBlock({...data, type: BLOCK_TYPES.AUDIO_VARIABLE});
    }

    getSelectorAttributes() {
        return {
            src: '',
            controls: ''
        }
    }

    getStartingTagName() {
        return 'audio';
    }
}
