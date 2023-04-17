import {BlockHTML} from "@/models/BlockHTML";

export class MediaUploadBlock extends BlockHTML {
    acceptType = '*';
    changeButtonTitle = 'Zmień';
    onChangeInput = `uploadMedia(event, '${this.id}', '${this.tagName}')`;
    addIcon = {name: 'fa-sharp fa-regular fa-upload', type: 'fontawesome'};

    getContentHtml() {
        return `<div class="media-container ${this.attributes.src ? 'with-media' : ''}">
                    ${this.generateSelector()}
                    <div class="loading"><div class="bar"></div></div>
                    <label for="file-input-${this.id}" class="add-label">
                        <input type="file" id="file-input-${this.id}"
                                onchange="${this.onChangeInput}"
                                accept="${this.acceptType}">
                        <my-icon type="${this.addIcon.type}" name="${this.addIcon.name}"></my-icon>
                    </label>
                </div>`;
    }

    getAdditionalButtonsHtml() {
        return `<div class="item-button"
                    onclick="triggerClick('file-input-${this.id}')"
                    title="${this.changeButtonTitle}">
                <i class="material-symbols-outlined">change_circle</i>
            </div>`;
    }
}

function onLoadMedia(request, media, container, dataId) {
    const result = request.response;
    media.src = result.url;
    container.classList.remove('uploading');

    emitEvent(EVENT_TYPES.UPDATE_ATTRIBUTES, {
        dataId,
        attributes: {src: result.url}
    });
}

function uploadMedia(ev, dataId, mediaSelector, onLoad) {
    selectItemById(dataId);
    const [file] = ev.target.files;
    if (!file) {
        return;
    }
    onLoad = onLoad ? onLoad : onLoadMedia;

    const container = document.querySelector(`[data-id="${dataId}"] .media-container`);
    container.classList.add('with-media', 'uploading');
    const media = document.querySelector(`[data-id="${dataId}"] .media-container ${mediaSelector}`);
    const progressBar = container.querySelector('.loading .bar');

    const request = upload(file, {
        onProgress: evt => {
            const {loaded, total} = evt;

            const value = ((loaded * 100) / total).toFixed(0);
            progressBar.style.width = `${value}%`;
        },
        onLoad: _ => onLoad(request, media, container, dataId)
    });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        if (media.src && media.src.startsWith('http')) {
            return;
        }
        media.src = reader.result;

        emitEvent(EVENT_TYPES.UPDATE_ATTRIBUTES, {
            dataId,
            attributes: {src: reader.result}
        });
    };
}
