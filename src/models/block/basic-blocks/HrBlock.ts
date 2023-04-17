import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class HrBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): HrBlock {
        return new HrBlock({...data, type: BLOCK_TYPES.HR});
    }

    getStartingStyle() {
        return {
            all: {
                basic: {
                    height: '1px',
                    width: '100%',
                    'margin-top': '0.5em',
                    'margin-bottom': '0.5em'
                }
            }
        };
    }

    getStartingTagName() {
        return 'hr';
    }
}
