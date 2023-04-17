import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class GoogleCalendarBlock extends BlockModel {
    modifyValueFn = 'modifyGoogleCalendarSourceValue';

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): GoogleCalendarBlock {
        return new GoogleCalendarBlock({...data, type: BLOCK_TYPES.GOOGLE_CALENDAR});
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
