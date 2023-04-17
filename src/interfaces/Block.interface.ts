import {BLOCK_TYPES} from "@/helpers/blocks";
import {Styles} from "@/models/Styles";
import {Children} from "@/models/Children";
import {PlainObj} from "@/interfaces/PlainObj";
import {BlockLinkInterface} from "@/interfaces/BlockLink.interface";

export interface BlockInterface extends BlockPlainInterface {

    getHumanName(): string;

    getStartingStyle(): PlainObj;

    setAttributes(attributes: PlainObj): void;

    findChildByIdRecursive(id: string): BlockInterface | undefined;

    findChildIndexById(id: string): number;

    findChildById(id: string): BlockInterface | undefined;

    removeChild(id: string): BlockInterface | undefined;

    appendChild(child: BlockInterface): void;

    appendChildAtIndex(child: BlockInterface, index: number | null): void;

    appendChildAfter(child: BlockInterface, afterId: string): void;
}

export interface BlockPlainInterface {
    id: string | null;
    type: BLOCK_TYPES;
    tagName: string;
    styles: Styles;
    children: Children;
    textContent: string;
    settings: PlainObj;
    attributes: PlainObj;
    blockLink: BlockLinkInterface | null;
}
