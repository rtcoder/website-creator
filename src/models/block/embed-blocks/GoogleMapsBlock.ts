import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class GoogleMapsBlock extends BlockModel {
    modifyValueFn = 'modifyGoogleMapsSourceValue';

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): GoogleMapsBlock {
        return new GoogleMapsBlock({...data, type: BLOCK_TYPES.GOOGLE_MAPS});
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
