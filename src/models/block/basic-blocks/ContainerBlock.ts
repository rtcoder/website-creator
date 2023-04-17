import {BlockModel} from "@/models/Block";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class ContainerBlock extends BlockModel {

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): ContainerBlock {
        return new ContainerBlock({...data, type: BLOCK_TYPES.CONTAINER});
    }

    getStartingStyle() {
        return {
            all: {
                basic: {
                    'min-height': '50px',
                    width: '100%',
                    display: 'flex',
                    'flex-direction': 'column',
                    'justify-content': 'start',
                    'align-items': 'start',
                }
            }
        };
    }

    getStartingTagName() {
        return 'div';
    }
}
