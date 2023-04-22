import React from "react";
import EmbedBlockComponent from "@/components/Blocks/EmbedBlockComponent";
import {setAttributes} from "@/store/structureSlice";
import {connect} from "react-redux";

class IframeBlockComponent extends EmbedBlockComponent {
    sourceModifier(source) {
        const {block} = this.props;
        if (!source.length) {

            this.props.setAttributes({blockId: block.id, attributes: {src: undefined}});

            return;
        }
        this.props.setAttributes({blockId: block.id, attributes: {src: source}});
    }
}


export default connect(null, {setAttributes})(IframeBlockComponent);
