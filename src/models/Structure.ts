import {Children} from "@/models/Children";
import {BlockModel} from "@/models/Block";
import {mapBlock} from "@/helpers/block";
import {PlainObj} from "@/interfaces/PlainObj";
import {BlockInterface} from "@/interfaces/Block.interface";

export class Structure extends Children {
    constructor(...items) {
        super(...items);
    }

    set(items) {
        this.push(...items);
    }

    moveBlock(blockId: string, targetId: string | null, index: number | null = null) {
        if (blockId === targetId) {
            return;
        }
        const block = this.findByIdRecursive(blockId);
        if (!block) {
            return;
        }
        const parent = this.getBlockParent(blockId, this);
        // this is because if parent equals null means it is main structure
        if ((parent?.id || null) === targetId) {
            // @TODO zmiana kolejnosci elementow
            return;
        }
        if (targetId === null) {
            this.addAtIndex(block, index);
            return;
        }
        if (block.children.findByIdRecursive(targetId)) {
            return;
        }
        this.removeRecursive(blockId);
        const target = this.findByIdRecursive(targetId);
        target?.appendChildAtIndex(block, index);
    }

    addBlock(block: BlockInterface, targetId: string | null, index = null) {
        if (block.id === targetId) {
            return;
        }
        if (targetId === null) {
            this.addAtIndex(block, index);
            return;
        }
        const target = this.findByIdRecursive(targetId);
        target?.appendChildAtIndex(block, index);
    }

    duplicateBlock(blockId: string): BlockInterface {
        const itemToDuplicate = this.findByIdRecursive(blockId);
        if (!itemToDuplicate) {
            return;
        }
        const duplicated = mapBlock(itemToDuplicate, true);

        if (this.findById(blockId)) {
            const index = this.findIndexById(blockId);
            this.addAtIndex(duplicated, index + 1);
            return duplicated;
        }

        const parent = this.getBlockParent(blockId, this);
        const index = parent.findChildIndexById(blockId);
        parent.appendChildAtIndex(duplicated, index + 1);

        return duplicated;
    }

    getPlainStructure(): PlainObj[] {
        return this.getPlainStructureArray(this);
    }

    private getBlockParent(blockId: string, structure: Structure | Children): BlockInterface {
        let found = null;
        for (const block of structure) {
            if (block.findChildById(blockId)) {
                found = block;
                break;
            }
            if (!found) {
                found = this.getBlockParent(blockId, block.children);
            }
            if (found) {
                return found;
            }
        }
        return found;
    }

    private getPlainStructureArray(structure: Structure | Children): PlainObj[] {
        return structure.map(block => this.getPlainBlockObject(block));
    }

    private getPlainBlockObject(block: BlockInterface): PlainObj {
        const plainBlock: { [key: string]: any } = {};
        Object.keys(BlockModel.create()).forEach(key => {
            plainBlock[key] = block[key];
        });
        plainBlock.children = this.getPlainStructureArray(block.children);

        return plainBlock;
    }
}
