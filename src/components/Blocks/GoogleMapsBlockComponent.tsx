import React from "react";
import EmbedBlockComponent from "@/components/Blocks/EmbedBlockComponent";

export default class GoogleMapsBlockComponent extends EmbedBlockComponent {
    sourceModifier(source) {
        if (source.includes('<iframe')) {
            const strPart = source.split(' ').find(part => part.startsWith('src'));
            if (strPart) {
                return strPart.replace('src="', '').replace('"', '');
            }
        }

        return source;
    }
}

