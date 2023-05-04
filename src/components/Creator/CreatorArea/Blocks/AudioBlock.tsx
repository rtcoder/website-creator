import React from "react";
import Icon from "@/components/construction/Icon/Icon";
import MediaUploadBlock from "./MediaBlock/MediaUploadBlock";
import {setAttributes} from "@/store/structureSlice";
import {connect} from "react-redux";

class AudioBlock extends MediaUploadBlock {

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
        return <audio src={this.props.block.attributes.src} controls/>
    }

    getUploadIcon() {
        return <Icon type="material-sharp" name="audio_file"/>
    }

    getAcceptType(): string {
        return 'audio/*';
    }
}

export default connect(null, {setAttributes})(AudioBlock as any) as any;
