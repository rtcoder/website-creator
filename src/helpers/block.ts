import {BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {_mapBlock} from "@/helpers/block-type-helpers";

export function findByIdRecursive(arr: BlockInterface[], id: string): BlockInterface | undefined {
    let found: BlockInterface | undefined = arr.find(child => child.id === id);
    if (found) {
        return found;
    }
    for (const child of arr) {
        found = findByIdRecursive(child.children, id);
        if (found) {
            return found;
        }
    }
    return;
}

export function findIndexById(arr: BlockInterface[], id: string): number {
    return arr.findIndex(child => child.id === id);
}

export function findIndexByIdRecursive(arr: BlockInterface[], id: string): number {
    let found: number = arr.findIndex(child => child.id === id);
    if (found > -1) {
        return found;
    }
    for (const child of arr) {
        found = findIndexByIdRecursive(child.children, id);
        if (found > -1) {
            return found;
        }
    }
    return;
}

export function findById(arr: BlockInterface[], id: string): BlockInterface | undefined {
    return arr.find(child => child.id === id);
}

/**
 *
 * @description returns removed object if any and new array without removed object
 */
export function removeRecursive(arr: BlockInterface[], id: string): { removed: BlockInterface | undefined; newArray: BlockInterface[] } {
    const t = [...arr];
    let removed = t.find(child => child.id === id);
    const newArray = []
    for (let idx in t) {
        let child = t[idx];
        if (!removed) {
            let result = removeRecursive(child.children, id);
            removed = result.removed;
            child.children = result.newArray;
        }
        if (child.id !== id) {
            newArray.push(child);
        }
    }
    return {removed, newArray};
}

export function addAtIndex(arr: BlockInterface[], child: BlockInterface, index: number | null = null): BlockInterface[] {
    const newArray = [...arr];
    if (index === null) {
        newArray.push(child);
        return newArray;
    }
    newArray.splice(index, 0, child);
    return newArray;
}

export function addAtIndexToTarget(arr: BlockInterface[], child: BlockInterface, targetId: string, index: number | null = null): BlockInterface[] {
    return [...arr].map(block => {
        block.children = block.id === targetId
            ? addAtIndex(block.children, child, index)
            : addAtIndexToTarget(block.children, child, targetId, index);

        return block;
    });
}

export function getBlockParent(arr: BlockInterface[], blockId: string): BlockInterface {
    let found = null;
    for (const block of arr) {
        if (findById(block.children, blockId)) {
            found = block;
            break;
        }
        if (!found) {
            found = getBlockParent(block.children, blockId);
        }
        if (found) {
            return found;
        }
    }
    return found;
}

export function moveBlock(arr: BlockInterface[], blockId: string, targetId: string | null, index: number | null = null): BlockInterface[] {
    let newArray = [...arr];
    if (blockId === targetId) {
        return arr;
    }
    // block we want to move
    const block = findByIdRecursive(arr, blockId);
    if (!block) {
        return arr;
    }
    const parent = getBlockParent(newArray, blockId);
    // this is because if parent equals null means it is main structure
    if ((parent?.id || null) === targetId) {
        // @TODO zmiana kolejnosci elementow
        return arr;
    }
    // if target parent is one of descendants then do nothing
    if (targetId && findByIdRecursive(block.children, targetId)) {
        return arr;
    }
    // removing block
    const result = removeRecursive(newArray, blockId);
    newArray = result.newArray;

    // target is main array, so we don't have to search parent item
    if (targetId === null) {
        return addAtIndex(newArray, block, index);
    }

    // and pushing it to new target
    newArray = addAtIndexToTarget(newArray, block, targetId, index)
    return newArray;
}

export function addNewBlockAtIndex(arr: BlockInterface[], block: BlockInterface, targetId: string | null, index = null) {
    let newArray = [...arr];
    if (block.id === targetId) {
        return newArray;
    }
    if (targetId === null) {
        return addAtIndex(newArray, block, index);
    }
    newArray = addAtIndexToTarget(newArray, block, targetId, index);
    return newArray;
}

export function duplicateBlk(arr: BlockInterface[], blockId: string): BlockInterface[] {
    let newArray = [...arr];
    const itemToDuplicate = findByIdRecursive(newArray, blockId);
    if (!itemToDuplicate) {
        return;
    }
    const duplicated = _mapBlock(itemToDuplicate, true);
// if block found in main array then add duplicate and return modified array
    if (findById(newArray, blockId)) {
        const index = findIndexById(newArray, blockId);
        return addAtIndex(newArray, duplicated, index + 1);
    }

    // find block parent
    const parent = getBlockParent(newArray, blockId);
    const index = findIndexById(parent.children, blockId);
    // add element after found index and return modified array
    return addAtIndexToTarget(newArray, duplicated, parent.id!, index + 1);
}

export function getBlockHumanReadableName(block: BlockInterface): string {
    return BLOCK_TYPES_HUMAN_NAMES[block.type];
}

export const updateBlockInStructure = (
    structure: BlockInterface[],
    blockId: string,
    newValue: BlockInterface
): BlockInterface[] => {

    return structure.map(block => {
        if (block.id === blockId) {
            return newValue;
        }
        block.children = updateBlockInStructure(block.children, blockId, newValue);
        return block;
    })
}

export function deepCloneStructure(structure: BlockInterface[]): BlockInterface[] {
    return structure.map(block => {
        return {
            ...block,
            children: deepCloneStructure(block.children)
        }
    })
}

export function getAllStructureAnchors(structure: BlockInterface[]) {
    const anchors = [];
    structure.forEach(block => {
        anchors.push(
            (block.attributes.id || ''),
            ...getAllStructureAnchors(block.children)
        );
    })
    return anchors.filter(v => parseInt(v) >= 0 || !!v)
}
