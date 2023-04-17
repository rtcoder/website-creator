import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class YoutubeBlock extends BlockModel {
    modifyValueFn = 'modifyYoutubeSourceValue';

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): YoutubeBlock {
        return new YoutubeBlock({...data, type: BLOCK_TYPES.YOUTUBE});
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
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
            allowfullscreen: ''
        }
    }
}

function modifyYoutubeSourceValue(inputValue) {
    if (inputValue.includes('youtube.com/watch')) {
        const [, ytId] = inputValue.split('?v=');
        return `https://www.youtube.com/embed/${ytId}`;
    } else if (inputValue.includes('youtu.be/')) {
        const [, ytId] = inputValue.split('youtu.be/');
        return `https://www.youtube.com/embed/${ytId}`;
    } else if (inputValue.includes('<iframe')) {
        const strPart = inputValue.split(' ').find(part => part.startsWith('src'));
        if (strPart) {
            return strPart.replace('src="', '').replace('"', '');
        }
    }

    return inputValue;
}
