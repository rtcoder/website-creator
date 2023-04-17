import {BlockInterface} from "@/interfaces/Block.interface";

export class Children extends Array<BlockInterface> {
    constructor(...items) {
        super(...items);
    }

    add(child: BlockInterface) {
        this.push(child);
    }

    addAtIndex(child: BlockInterface, index: number | null = null) {
        if (index === null) {
            this.add(child);
            return;
        }
        this.splice(index, 0, child);
    }

    remove(id: string): BlockInterface | undefined {
        const t = [...this];
        const removed = t.find(child => child.id === id);
        this.length = 0;
        for (const child of t) {
            if (child.id !== id) {
                this.push(child);
            }
        }
        return removed;
    }

    removeRecursive(id: string): BlockInterface | undefined {
        const t = [...this];
        let removed = t.find(child => child.id === id);
        this.length = 0;
        for (const child of t) {
            if (!removed) {
                removed = child.removeChild(id);
            }
            if (child.id !== id) {
                this.push(child);
            }
        }
        return removed;
    }

    findById(id: string): BlockInterface | undefined {
        return this.find(child => child.id === id);
    }

    findIndexById(id: string): number {
        return this.findIndex(child => child.id === id);
    }

    findByIdRecursive(id: string): BlockInterface | undefined {
        let found: BlockInterface | undefined = this.find(child => child.id === id);
        if (found) {
            return found;
        }
        for (const child of this) {
            found = child.findChildByIdRecursive(id);
            if (found) {
                return found;
            }
        }
        return;
    }
}
