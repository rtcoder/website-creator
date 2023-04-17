import {BLOCK_TYPES, BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
import {makeId} from "@/helpers/string-helpers";
import {Styles} from "@/models/Styles";
import {Children} from "@/models/Children";
import {BlockInterface} from "@/interfaces/Block.interface";
import {PlainObj} from "@/interfaces/PlainObj";

export class BlockModel implements BlockInterface {
    id: string | null = null;
    type: BLOCK_TYPES;
    tagName: string;
    styles: Styles;
    children: Children = [] as Children;
    textContent: string;
    settings = {};
    attributes = {};
    blockLink = null

    private constructor(data: Partial<BlockInterface> = {}) {
        this.setStartingTextContent();
        this.styles = new Styles(this.getStartingStyle());

        Object.assign(this as BlockInterface, data);

        this.styles = new Styles(this.styles);

        this.children = new Children(...(this.children || []));

        if (!this.id) {
            this.id = makeId(10);
        }

        if (!this.tagName) {
            this.tagName = this.getStartingTagName();
        }

        if (!Object.keys(this.attributes).length) {
            this.attributes = this.getStartingAttributes();
        }
    }

    static create(data: Partial<BlockInterface> = {}): BlockInterface {
        return new BlockModel(data);
    }

    getHumanName() {
        return BLOCK_TYPES_HUMAN_NAMES[this.type];
    }

    setAttributes(attributes: PlainObj) {
        this.attributes = {
            ...this.attributes,
            ...attributes
        };
    }

    setStartingTextContent() {
        this.textContent = '';
    }

    getStartingStyle(): PlainObj {
        return {};
    }

    getStartingTagName() {
        return '';
    }

    getStartingAttributes() {
        return {};
    }

    findChildByIdRecursive(id: string): BlockInterface | undefined {
        return this.children.findByIdRecursive(id);
    }

    findChildIndexById(id: string): number {
        return this.children.findIndexById(id);
    }

    findChildById(id: string): BlockInterface | undefined {
        return this.children.findById(id);
    }

    removeChild(id: string): BlockInterface | undefined {
        return this.children.removeRecursive(id);
    }

    appendChild(child: BlockInterface) {
        this.children.add(child);
    }

    appendChildAtIndex(child: BlockInterface, index: number | null) {
        this.children.addAtIndex(child, index);
    }

    appendChildAfter(child: BlockInterface, afterId: string) {
        const indexAfterId = this.children.findIndex(item => item.id === afterId);
        this.children.splice(indexAfterId + 1, 0, child);
    }

}

