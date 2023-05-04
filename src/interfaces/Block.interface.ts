import {BlockLinkInterface} from "@/interfaces/BlockLink.interface";
import {IconType} from "@/components/construction/Icon/Icon";
import {WithStyles} from "@/interfaces/Styles.interface";
import {BlockTypes} from "@/types/block-type";

export interface BlockInterface extends WithStyles {
    id: string;
    type: BlockTypes.BlockType;
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
    id?: string;
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
