import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class GoogleCalendarBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): GoogleCalendarBlock {
        return new GoogleCalendarBlock({...data, type: BLOCK_TYPES.GOOGLE_CALENDAR});
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

