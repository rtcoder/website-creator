import {BLOCK_TYPES} from "@/helpers/blocks";
import {VariableBlock} from "@/models/VariableBlock";

export class VariableAudioBlock extends VariableBlock {
    type = BLOCK_TYPES.AUDIO_VARIABLE;

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
