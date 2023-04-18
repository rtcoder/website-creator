import {BlockHTML} from "@/models/BlockHTML";

export class MediaUploadBlock extends BlockHTML {
    changeButtonTitle = 'Zmień';

    getAdditionalButtonsHtml() {
        return `<div class="item-button"
                    onclick="triggerClick('file-input-${this.id}')"
                    title="${this.changeButtonTitle}">
                <i class="material-symbols-outlined">change_circle</i>
            </div>`;
    }
}

