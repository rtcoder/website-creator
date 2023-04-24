import React from "react";
import EmbedBlockComponent from "@/components/Creator/Blocks/EmbedBlockComponent";
import {setAttributes} from "@/store/structureSlice";
import {connect} from "react-redux";

class VimeoBlockComponent extends EmbedBlockComponent {
    sourceModifier(source) {
        const {block} = this.props;
        if (!source.length) {

            this.props.setAttributes({blockId: block.id, attributes: {src: undefined}});

            return;
        }
        if (source.includes('vimeo.com/')) {
            const [, vId] = source.split('vimeo.com/');
            source = `https://player.vimeo.com/video/${vId}`;
        } else if (source.includes('<iframe')) {
            const strPart = source.split(' ').find(part => part.startsWith('src'));
            if (strPart) {
                source = strPart.replace('src="', '').replace('"', '');
            }
        }

        this.props.setAttributes({blockId: block.id, attributes: {src: source}});
    }
}


export default connect(null, {setAttributes})(VimeoBlockComponent);
