import {BlockHTML} from "@/models/BlockHTML";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class IconBlock extends BlockHTML {
    type = BLOCK_TYPES.ICON;

    static getIconStartingStyles() {
        return {
            all: {
                basic: {
                    'aspect-ratio': '1/1',
                    height: '50px',
                    width: '50px',
                    'font-size': '30px',
                    display: 'flex',
                    'flex-direction': 'column',
                    'justify-content': 'center',
                    'align-items': 'center',
                }
            }
        };
    }

    getContentHtml() {
        return `<div class="icon-container" data-icon-type="${this.settings.iconType ?? ''}">
                    <my-icon type="${this.settings.iconType ?? ''}" name="${this.textContent}"></my-icon>
                    <div class="add-icon" data-bs-toggle="offcanvas" data-bs-target="#iconSettings" class="mx-2"
                        style="font-size: 18px;text-align:center;cursor:pointer;">
                        <i class="fa-solid fa-plus"></i> Dodaj
                    </div>
                </div>`;
    }

    getAdditionalButtonsHtml() {
        return `<my-icon class="item-button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#iconSettings"
                    title="Zmień ikonkę"
                    type="material-outlined"
                    name="change_circle"></my-icon>`
    }

    getStartingStyle() {
        return IconBlock.getIconStartingStyles();
    }

    getStartingTagName() {
        return 'my-icon';
    }
}
