import React from "react";
import EmbedBlockComponent from "@/components/Blocks/EmbedBlockComponent";

export default class YouTubeBlockComponent extends EmbedBlockComponent {
    sourceModifier(source) {
        if (source.includes('youtube.com/watch')) {
            const [, ytId] = source.split('?v=');
            return `https://www.youtube.com/embed/${ytId}`;
        } else if (source.includes('youtu.be/')) {
            const [, ytId] = source.split('youtu.be/');
            return `https://www.youtube.com/embed/${ytId}`;
        } else if (source.includes('<iframe')) {
            const strPart = source.split(' ').find(part => part.startsWith('src'));
            if (strPart) {
                return strPart.replace('src="', '').replace('"', '');
            }
        }

        return source;
    }
}

