import {BlockType} from "@/helpers/blocks";
import {BlockLinkInterface} from "@/interfaces/BlockLink.interface";
import {IconType} from "@/components/Icon";
import {WithStyles} from "@/interfaces/Styles.interface";

export interface BlockInterface extends WithStyles {
    id: string;
    type: BlockType;
    tagName: string;
    children: BlockInterface[];
    textContent: string;
    settings: BlockSettingsInterface;
    attributes: BlockAttributesInterface;
    blockLink: BlockLinkInterface | null;
}

export interface BlockSettingsInterface {
    icon?: BlockSettingsIconInterface;
}

export interface BlockSettingsIconInterface {
    type: IconType;
    name: string;
}

export interface BlockAttributesInterface {
    scrolling?: string;
    style?: string;
    referrerPolicy?: string;
    width?: string;
    height?: string;
    loading?: string;
    src?: string;
    frameBorder?: string;
    allow?: string;
    allowFullscreen?: string;
    type?: string;

}
