import {BlockType} from "@/helpers/blocks";
import {PlainObj} from "@/interfaces/PlainObj";
import {BlockLinkInterface} from "@/interfaces/BlockLink.interface";
import {IconType} from "@/components/Icon";
import {WithStyles} from "@/interfaces/Styles.interface";

export interface BlockInterface extends WithStyles {
    id: string | null;
    type: BlockType;
    tagName: string;
    children: BlockInterface[];
    textContent: string;
    settings: BlockSettingsInterface;
    attributes: PlainObj;
    blockLink: BlockLinkInterface | null;
}

export interface BlockSettingsInterface {
    icon?: BlockSettingsIconInterface;
}

export interface BlockSettingsIconInterface {
    type: IconType;
    name: string;
}
