import {BlockHTML} from "@/models/BlockHTML";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class UlBlock extends BlockHTML {
    type = BLOCK_TYPES.UL;

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
