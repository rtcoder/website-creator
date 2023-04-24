import React from "react";
import EmbedBlockComponent from "@/components/Creator/CreatorArea/Blocks/EmbedBlockComponent";
import {setAttributes} from "@/store/structureSlice";
import {connect} from "react-redux";

class YouTubeBlockComponent extends EmbedBlockComponent {
    sourceModifier(source) {
        const {block} = this.props;
        if (!source.length) {

            this.props.setAttributes({blockId: block.id, attributes: {src: undefined}});

            return;
        }
        if (source.includes('youtube.com/watch')) {
            const [, ytId] = source.split('?v=');
            source = `https://www.youtube.com/embed/${ytId}`;
        } else if (source.includes('youtu.be/')) {
            const [, ytId] = source.split('youtu.be/');
            source = `https://www.youtube.com/embed/${ytId}`;
        } else if (source.includes('<iframe')) {
            const strPart = source.split(' ').find(part => part.startsWith('src'));
            if (strPart) {
                source = strPart.replace('src="', '').replace('"', '');
            }
        }

        this.props.setAttributes({blockId: block.id, attributes: {src: source}});
    }
}


export default connect(null, {setAttributes})(YouTubeBlockComponent);
