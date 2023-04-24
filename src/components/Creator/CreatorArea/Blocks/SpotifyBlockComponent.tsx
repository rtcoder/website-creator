import React from "react";
import EmbedBlockComponent from "@/components/Creator/CreatorArea/Blocks/EmbedBlockComponent";
import {setAttributes} from "@/store/structureSlice";
import {connect} from "react-redux";

class SpotifyBlockComponent extends EmbedBlockComponent {
    sourceModifier(source) {
        const {block} = this.props;
        if (!source.length) {

            this.props.setAttributes({blockId: block.id, attributes: {src: undefined}});

            return;
        }
        if (source.includes('<iframe')) {
            const strPart = source.split(' ').find(part => part.startsWith('src'));
            if (strPart) {
                source = strPart.replace('src="', '').replace('"', '');
            }
        } else if (!source.includes('embed/')) {
            source = source.replace('spotify.com', 'spotify.com/embed');
        }

        this.props.setAttributes({blockId: block.id, attributes: {src: source}});
    }
}


export default connect(null, {setAttributes})(SpotifyBlockComponent);
