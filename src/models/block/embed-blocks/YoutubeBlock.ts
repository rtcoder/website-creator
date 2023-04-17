import {FrameBlock} from "@/models/FrameBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class YoutubeBlock extends FrameBlock {
    type = BLOCK_TYPES.YOUTUBE;
    modifyValueFn = 'modifyYoutubeSourceValue';

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
