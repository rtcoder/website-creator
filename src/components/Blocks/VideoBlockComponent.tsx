import React from "react";
import Icon from "@/components/Icon";
import MediaUploadBlockComponent from "@/components/Blocks/MediaUploadBlockComponent";

export default class VideoBlockComponent extends MediaUploadBlockComponent {
    onLoadMedia(request) {
        const result = request.response;
        const {block} = this.state;

        block.setAttributes({src: result.url, poster: result.thumbnails_urls[0]});
        this.setState({
            block,
            isUploading: false,
            uploadProgress: 0
        });
    }

    getMediaComponent() {
        return <video src={this.state.block.attributes.src} poster={this.state.block.attributes.poster} controls/>
    }

    getUploadIcon() {
        return <Icon type="fontawesome" name="fa-sharp fa-light fa-video-plus"/>
    }

    getAcceptType(): string {
        return 'video/*';
    }
}

