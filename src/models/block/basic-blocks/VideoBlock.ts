import {MediaUploadBlock} from "@/models/MediaUploadBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";

export class VideoBlock extends MediaUploadBlock {
    type = BLOCK_TYPES.VIDEO;
    acceptType = 'video/*';
    changeButtonTitle = 'Zmień wideo';
    onChangeInput = `uploadMedia(event, '${this.id}', '${this.tagName}', onLoadMediaVideo)`;
    addIcon = {name: 'fa-sharp fa-light fa-video-plus', type: 'fontawesome'};

    getSelectorAttributes() {
        return {
            src: this.attributes.src ?? '',
            poster: this.attributes.poster ?? '',
        }
    }

    getStartingTagName() {
        return 'video';
    }
}

function onLoadMediaVideo(request, media, container, dataId) {
    const result = request.response;
    media.src = result.url;
    media.setAttribute('poster', result.thumbnails_urls[0]);
    container.classList.remove('uploading');

    emitEvent(EVENT_TYPES.UPDATE_ATTRIBUTES, {
        dataId,
        attributes: {src: result.url, poster: result.thumbnails_urls[0]}
    });
}
