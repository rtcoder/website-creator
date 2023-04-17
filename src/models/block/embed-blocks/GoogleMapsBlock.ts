import {FrameBlock} from "@/models/FrameBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class GoogleMapsBlock extends FrameBlock {
    type = BLOCK_TYPES.GOOGLE_MAPS;
    modifyValueFn = 'modifyGoogleMapsSourceValue';

    getSelectorAttributes() {
        return {
            ...this.getStartingAttributes(),
            src: this.attributes.src ?? '',
        }
    }

    getStartingAttributes() {
        return {
            src: '',
            allowfullscreen: '',
            width: '100%',
            height: '100%',
            style: 'border:0;',
            referrerpolicy: 'no-referrer-when-downgrade',
            loading: 'lazy'
        }
    }
}

function modifyGoogleMapsSourceValue(inputValue) {
    if (inputValue.includes('<iframe')) {
        const strPart = inputValue.split(' ').find(part => part.startsWith('src'));
        if (strPart) {
            return strPart.replace('src="', '').replace('"', '');
        }
    }

    return inputValue;
}
