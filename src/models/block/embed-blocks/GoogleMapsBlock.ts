import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class GoogleMapsBlock extends BlockModel {

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): GoogleMapsBlock {
        return new GoogleMapsBlock({...data, type: BLOCK_TYPES.GOOGLE_MAPS});
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
