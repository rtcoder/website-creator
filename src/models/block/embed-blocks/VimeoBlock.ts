import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VimeoBlock extends BlockModel {
    modifyValueFn = 'modifyVimeoSourceValue';

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VimeoBlock {
        return new VimeoBlock({...data, type: BLOCK_TYPES.VIMEO});
    }

    getSelectorAttributes() {
        return {
            ...this.getStartingAttributes(),
            src: this.attributes.src ?? '',
        }
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

function modifyVimeoSourceValue(inputValue) {
    if (inputValue.includes('vimeo.com/')) {
        const [, vId] = inputValue.split('vimeo.com/');
        return `https://player.vimeo.com/video/${vId}`;
    } else if (inputValue.includes('<iframe')) {
        const strPart = inputValue.split(' ').find(part => part.startsWith('src'));
        if (strPart) {
            return strPart.replace('src="', '').replace('"', '');
        }
    }

    return inputValue;
}
