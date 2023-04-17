import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockModel} from "@/models/Block";
import {BlockInterface} from "@/interfaces/Block.interface";

export class ButtonBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): ButtonBlock {
        return new ButtonBlock({...data, type: BLOCK_TYPES.BUTTON});
    }

    setStartingTextContent() {
        this.textContent = 'Przycisk';
    }

    getStartingStyle() {
        return {
            all: {
                basic: {
                    'background-color': 'rgb(239, 239, 239)',
                    width: '65px',
                    height: '30px',
                }
            }
        };
    }

    getStartingTagName() {
        return 'button';
    }

    getStartingAttributes() {
        return {
            type: 'button'
        }
    }
}
