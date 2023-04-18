import React from "react";
import EmbedBlockComponent from "@/components/Blocks/EmbedBlockComponent";

export default class VimeoBlockComponent extends EmbedBlockComponent {
    sourceModifier(source) {
        if (source.includes('vimeo.com/')) {
            const [, vId] = source.split('vimeo.com/');
            return `https://player.vimeo.com/video/${vId}`;
        } else if (source.includes('<iframe')) {
            const strPart = source.split(' ').find(part => part.startsWith('src'));
            if (strPart) {
                return strPart.replace('src="', '').replace('"', '');
            }
        }

        return source;
    }
}

