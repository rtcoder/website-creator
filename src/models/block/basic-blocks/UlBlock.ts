import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class UlBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): UlBlock {
        return new UlBlock({...data, type: BLOCK_TYPES.UL});
    }

    getContentHtml() {
        return `<ul class="children"
                    data-drop
                    data-dragover
                    data-dragleave>

            ${this.children.map(child => child.getHtml()).join('')}
        </ul>`
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
        return 'ul';
    }
}
