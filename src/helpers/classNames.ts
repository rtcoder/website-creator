interface ClassedObject {
    [key: string]: boolean;
}

type classesParam = ClassedObject | string[];
export default function classNames(classes: classesParam): string {
    if (Array.isArray(classes)) {
        return classes.join(' ').trim();
    }

    return Object.keys(classes).filter(key => classes[key]).join(' ').trim();
}
