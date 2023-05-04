import React from "react";
import EmbedBlock from "./EmbedBlock/EmbedBlock";
import {setAttributes} from "@/store/structureSlice";
import {connect} from "react-redux";

class IframeBlock extends EmbedBlock {
    sourceModifier(source) {
        const {block} = this.props;
        if (!source.length) {

            this.props.setAttributes({blockId: block.id, attributes: {src: undefined}});

            return;
        }
        this.props.setAttributes({blockId: block.id, attributes: {src: source}});
    }
}


export default connect(null, {setAttributes})(IframeBlock as any) as any;
