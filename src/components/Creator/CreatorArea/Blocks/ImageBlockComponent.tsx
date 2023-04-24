import React from "react";
import Icon from "@/components/construction/Icon/Icon";
import MediaUploadBlockComponent from "@/components/Creator/CreatorArea/Blocks/MediaUploadBlockComponent";
import {setAttributes} from "@/store/structureSlice";
import {connect} from "react-redux";

class ImageBlockComponent extends MediaUploadBlockComponent {
    onLoadMediaRequest(request) {
        const result = request.response;
        const {block} = this.props;

        this.props.setAttributes({blockId: block.id, attributes: {src: result.url}});
        super.setState({
            isUploading: false,
            uploadProgress: 0
        });
    }

    onLocalLoadMedia(reader: FileReader): void {
        const {block} = this.props;
        if (block.attributes.src && block.attributes.src.startsWith('http')) {
            return;
        }
        this.props.setAttributes({blockId: block.id, attributes: {src: reader.result}});
    }

    getMediaComponent() {
        return <img src={this.props.block.attributes.src} alt=""/>
    }

    getUploadIcon() {
        return <Icon type="material-sharp" name="add_photo_alternate"/>
    }

    getAcceptType(): string {
        return 'image/*';
    }
}

export default connect(null, {setAttributes})(ImageBlockComponent);
