import React from "react";
import Icon from "@/components/Icon";
import MediaUploadBlockComponent from "@/components/Blocks/MediaUploadBlockComponent";

export default class AudioBlockComponent extends MediaUploadBlockComponent {

    getMediaComponent() {
        return <audio src={this.state.block.attributes.src} controls/>
    }

    getUploadIcon() {
        return <Icon type="material-sharp" name="audio_file"/>
    }

    getAcceptType(): string {
        return 'audio/*';
    }
}

