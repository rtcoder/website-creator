import {BlockModel} from "@/models/Block";

export class BlockHTML extends BlockModel {

    getHtml() {
        return ``;
    }

    getContentHtml() {
        return '';
    }

    #getButtonsHtml() {
        return `<div class="item-buttons">
                <my-icon class="item-button down"
                        onclick="moveElementDown(event)"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Przenieś w dół"
                        type="material-outlined"
                        name="expand_more"></my-icon>

                <my-icon class="item-button up"
                        onclick="moveElementUp(event)"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Przenieś w górę"
                        type="material-outlined"
                        name="expand_less"></my-icon>

                <my-icon class="item-button left"
                        onclick="moveElementUp(event)"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Przenieś w lewo"
                        type="material-outlined"
                        name="chevron_left"></my-icon>

                <my-icon class="item-button right"
                        onclick="moveElementDown(event)"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Przenieś w prawo"
                        type="material-outlined"
                        name="chevron_right"></my-icon>

                ${this.getAdditionalButtonsHtml()}
                <my-icon class="item-button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#blockSettings"
                        title="Ustawienia"
                        type="material-outlined"
                        name="build"></my-icon>

                <my-icon class="item-button"
                        data-onclick-duplicate
                        title="Duplikuj"
                        type="material-outlined"
                        name="content_copy"></my-icon>

                <my-icon class="item-button move drag-handler"
                        data-drag-handler
                        title="Przenieś"
                        type="material-outlined"
                        name="open_with"></my-icon>

                <my-icon class="item-button delete"
                        data-onclick-delete="${this.id}"
                        title="Usuń"
                        type="material-outlined"
                        name="close"></my-icon>
            </div>`
    }

}
