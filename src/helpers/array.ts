export function arrayMove<T>(array: T[], fromIndex: number, toIndex: number): T[] {
    const newArray: T[] = [...array];
    const startIndex = fromIndex < 0 ? newArray.length + fromIndex : fromIndex;

    if (startIndex >= 0 && startIndex < newArray.length) {
        const endIndex = toIndex < 0 ? newArray.length + toIndex : toIndex;

        const [item] = newArray.splice(fromIndex, 1);
        newArray.splice(endIndex, 0, item);
    }
    return newArray;
}
