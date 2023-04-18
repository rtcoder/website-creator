import React from "react";
import EmbedBlockComponent from "@/components/Blocks/EmbedBlockComponent";

export default class IframeBlockComponent extends EmbedBlockComponent {
    sourceModifier(source) {
        return source;
    }
}

