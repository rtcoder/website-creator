import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VideoBlock extends BlockModel {
    acceptType = 'video/*';
    changeButtonTitle = 'Zmień wideo';
    onChangeInput = `uploadMedia(event, '${this.id}', '${this.tagName}', onLoadMediaVideo)`;
    addIcon = {name: 'fa-sharp fa-light fa-video-plus', type: 'fontawesome'};

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VideoBlock {
        return new VideoBlock({...data, type: BLOCK_TYPES.VIDEO});
    }

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
