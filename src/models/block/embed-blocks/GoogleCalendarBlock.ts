import {FrameBlock} from "@/models/FrameBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class GoogleCalendarBlock extends FrameBlock {
    type = BLOCK_TYPES.GOOGLE_CALENDAR;
    modifyValueFn = 'modifyGoogleCalendarSourceValue';

    getSelectorAttributes() {
        return {
            ...this.getStartingAttributes(),
            src: this.attributes.src ?? '',
        }
    }

    getStartingAttributes() {
        return {
            src: '',
            width: '100%',
            height: '100%',
            style: 'border:0;',
            frameborder: '0',
            scrolling: 'no',
        }
    }
}

function modifyGoogleCalendarSourceValue(inputValue) {
    if (inputValue.includes('<iframe')) {
        const strPart = inputValue.split(' ').find(part => part.startsWith('src'));
        if (strPart) {
            return strPart.replace('src="', '').replace('"', '');
        }
    }

    return inputValue;
}
