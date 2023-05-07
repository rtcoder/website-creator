import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockTypes} from "@/types/block-type";

function getStyleString(block: BlockInterface): string {
    const className = '.' + block.id;
    const modeSuffix = {
        'basic': '',
        'hover': ':hover'
    };
    let css = '';
    Object.keys(block.styles).forEach(rwd => {
        let styleRwd = '';
        Object.keys(block.styles[rwd]).forEach(mode => {
            let styleString = '';
            Object.keys(block.styles[rwd][mode]).forEach(prop => {
                const value = block.styles[rwd][mode][prop];
                styleString += `${prop}:${value};`
            })
            if (styleString.trim().length > 0) {
                styleRwd += `${className}${modeSuffix[mode]}{${styleString}}`;
            }
        })
        if (rwd === 'all') {
            css += styleRwd;
        } else {
            css += `@media (${rwd}){${styleRwd}}`;
        }
    })

    return css;
}

function getAllStyles(structure:BlockInterface[]):string{
    let styles:string[] =[];
    structure.forEach(block=>{
        const childrenStyles=getAllStyles(block.children);
        styles.push(
            getStyleString(block),
            childrenStyles
        )
    })
    return styles.join('')
}

const getAttributes = (block: BlockInterface): string => {
    const {attributes, id} = block;
    const attr = {
        ...attributes,
        class: `${id} ${attributes.class || ''}`.trim()
    }
    return Object.keys(attr).map(key => {
        return `${key}="${attr[key]}"`
    }).join(' ');
}
const mapContainer = (block: BlockInterface): string => {
    const {tagName, children} = block;
    return `<${tagName} ${getAttributes(block)}>${convertBlocksToString(children)}</${tagName}>`
}
const mapBlock = (block: BlockInterface): string => {
    const {textContent, tagName} = block;
    return `<${tagName} ${getAttributes(block)}>${textContent}</${tagName}>`;
}
const mapIcon = (block: BlockInterface): string => {
    const {tagName, id, children, settings: {icon: {type, name}}} = block;
    return '';
}
const blockTypeFunction = {
    [BlockTypes.CONTAINER]: mapContainer,
    [BlockTypes.UL]: mapContainer,
    [BlockTypes.ICON]: mapContainer,
}
const getMapFunction = (block: BlockInterface): (block: BlockInterface) => string => {
    return blockTypeFunction[block.type] || mapBlock;
}
const mapBlockToString = (block: BlockInterface): string => {
    return getMapFunction(block)(block)
}

export function convertBlocksToString(structure: BlockInterface[]): string {
    return structure.map(mapBlockToString).join('\n')
}
export function convertStructureToHtml(structure: BlockInterface[]): string {
    const html=convertBlocksToString(structure);
    const style=getAllStyles(structure);
    return `<html lang=""><head><style>${style}</style></head><body>${html}</body></html>`;
}
