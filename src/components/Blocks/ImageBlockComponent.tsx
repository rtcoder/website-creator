import React from "react";
import Icon from "@/components/Icon";
import MediaUploadBlockComponent from "@/components/Blocks/MediaUploadBlockComponent";

export default class ImageBlockComponent extends MediaUploadBlockComponent {
    getMediaComponent() {
        return <img src={this.state.block.attributes.src} alt=""/>
    }

    getUploadIcon() {
        return <Icon type="material-sharp" name="add_photo_alternate"/>
    }

    getAcceptType(): string {
        return 'image/*';
    }
}

