import React from "react";
import Icon from "@/components/construction/Icon/Icon";
import {setAttributes} from "@/store/structureSlice";
import {connect} from "react-redux";
import MediaUploadBlock from "./MediaBlock/MediaUploadBlock";

class VideoBlock extends MediaUploadBlock {
    onLoadMediaRequest(request) {
        const result = request.response;
        const {block} = this.props;

        this.props.setAttributes({blockId: block.id, attributes: {src: result.url, poster: result.thumbnails_urls[0]}});
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
        return <video src={this.props.block.attributes.src} poster={this.props.block.attributes.poster} controls/>
    }

    getUploadIcon() {
        return <Icon type="fontawesome" name="fa-sharp fa-light fa-video-plus"/>
    }

    getAcceptType(): string {
        return 'video/*';
    }
}

export default connect(null, {setAttributes})(VideoBlock as any) as any;
