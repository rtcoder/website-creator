import {BlockHTML} from "@/models/BlockHTML";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class HrBlock extends BlockHTML {
    type = BLOCK_TYPES.HR;

    getContentHtml() {
        return this.generateSelector();
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
