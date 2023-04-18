import React from "react";
import EmbedBlockComponent from "@/components/Blocks/EmbedBlockComponent";

export default class SpotifyBlockComponent extends EmbedBlockComponent {
    sourceModifier(source) {
        if (source.includes('<iframe')) {
            const strPart = source.split(' ').find(part => part.startsWith('src'));
            if (strPart) {
                return strPart.replace('src="', '').replace('"', '');
            }
        } else if (!source.includes('embed/')) {
            return source.replace('spotify.com', 'spotify.com/embed');
        }

        return source;
    }
}

