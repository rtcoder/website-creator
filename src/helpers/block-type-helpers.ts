import {BLOCK_TYPES, BlockType} from "@/helpers/blocks";
import {BlockAttributesInterface, BlockInterface} from "@/interfaces/Block.interface";
import {Styles} from "@/interfaces/Styles.interface";
import {makeId} from "@/helpers/string-helpers";
import {PlainObj} from "@/interfaces/PlainObj";
import {PartiallyRequired} from "@/types/utils";

const plainBlock: BlockInterface = {
    id: null,
    type: BLOCK_TYPES.CONTAINER,
    tagName: '',
    styles: {},
    children: [],
    textContent: '',
    settings: {},
    attributes: {},
    blockLink: null,
}

const getTagName = (type: BlockType): string => ({
    [BLOCK_TYPES.CONTAINER]: 'div',
    [BLOCK_TYPES.PARAGRAPH]: 'p',
    [BLOCK_TYPES.HEADING]: 'h1',
    [BLOCK_TYPES.UL]: 'ul',
    [BLOCK_TYPES.IMAGE]: 'img',
    [BLOCK_TYPES.VIDEO]: 'video',
    [BLOCK_TYPES.BUTTON]: 'button',
    [BLOCK_TYPES.AUDIO]: 'audio',
    [BLOCK_TYPES.YOUTUBE]: 'iframe',
    [BLOCK_TYPES.VIMEO]: 'iframe',
    [BLOCK_TYPES.HR]: 'hr',
    [BLOCK_TYPES.QUOTE]: 'q',
    [BLOCK_TYPES.IFRAME]: 'iframe',
    [BLOCK_TYPES.SPOTIFY]: 'iframe',
    [BLOCK_TYPES.PARAGRAPH_VARIABLE]: 'p',
    [BLOCK_TYPES.HEADING_VARIABLE]: 'h1',
    [BLOCK_TYPES.IMAGE_VARIABLE]: 'img',
    [BLOCK_TYPES.VIDEO_VARIABLE]: 'video',
    [BLOCK_TYPES.AUDIO_VARIABLE]: 'audio',
    [BLOCK_TYPES.QUOTE_VARIABLE]: 'q',
    [BLOCK_TYPES.GOOGLE_MAPS]: 'iframe',
    [BLOCK_TYPES.GOOGLE_CALENDAR]: 'iframe',
}[type] || '');

const getIconStartingStyles = () => {
    return {
        all: {
            basic: {
                'aspect-ratio': '1/1',
                height: '50px',
                width: '50px',
                'font-size': '30px',
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'center',
                'align-items': 'center',
            }
        }
    };
}
const getContainerStartingStyles = () => {
    return {
        all: {
            basic: {
                'min-height': '50px',
                width: '100%',
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'start',
                'align-items': 'start',
            }
        }
    };
}

const getStartingStyle = (type: BlockType): Styles => ({
    [BLOCK_TYPES.CONTAINER]: getContainerStartingStyles(),
    [BLOCK_TYPES.UL]: getContainerStartingStyles(),
    [BLOCK_TYPES.BUTTON]: {
        all: {
            basic: {
                'background-color': 'rgb(239, 239, 239)',
                width: '65px',
                height: '30px',
            }
        }
    },
    [BLOCK_TYPES.ICON]: getIconStartingStyles(),
    [BLOCK_TYPES.HR]: {
        all: {
            basic: {
                height: '1px',
                width: '100%',
                'margin-top': '0.5em',
                'margin-bottom': '0.5em'
            }
        }
    },
    [BLOCK_TYPES.SPOTIFY]: {
        all: {
            basic: {
                display: 'grid',
                width: '100%'
            }
        }
    },
    [BLOCK_TYPES.ICON_VARIABLE]: getIconStartingStyles(),
}[type] || {});
const getStartingAttributes = (type: BlockType): BlockAttributesInterface => ({
    [BLOCK_TYPES.BUTTON]: {
        type: 'button'
    },
    [BLOCK_TYPES.YOUTUBE]: {
        src: '',
        frameBorder: '0',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        allowFullscreen: ''
    },
    [BLOCK_TYPES.VIMEO]: {
        src: '',
        frameBorder: '0',
        allow: 'autoplay; fullscreen; picture-in-picture',
        allowFullscreen: ''
    },
    [BLOCK_TYPES.IFRAME]: {
        src: '',
        frameBorder: '0',
    },
    [BLOCK_TYPES.SPOTIFY]: {
        src: '',
        frameBorder: '0',
        allowFullscreen: '',
        width: '100%',
        height: '100%',
        allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
        loading: 'lazy'
    },
    [BLOCK_TYPES.GOOGLE_MAPS]: {
        src: '',
        allowFullscreen: '',
        width: '100%',
        height: '100%',
        style: 'border:0;',
        referrerPolicy: 'no-referrer-when-downgrade',
        loading: 'lazy'
    },
    [BLOCK_TYPES.GOOGLE_CALENDAR]: {
        src: '',
        width: '100%',
        height: '100%',
        style: 'border:0;',
        frameBorder: '0',
        scrolling: 'no',
    },
}[type] as BlockAttributesInterface || {});
const getStartingTextContent = (type: BlockType): string => ({
    [BLOCK_TYPES.PARAGRAPH]: 'Paragraf',
    [BLOCK_TYPES.HEADING]: 'Nagłówek',
    [BLOCK_TYPES.BUTTON]: 'Przycisk',
    [BLOCK_TYPES.QUOTE]: 'Cytat',
    [BLOCK_TYPES.PARAGRAPH_VARIABLE]: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis eros posuere erat aliquet mattis facilisis rutrum.',
    [BLOCK_TYPES.HEADING_VARIABLE]: 'Nagłówek',
    [BLOCK_TYPES.QUOTE_VARIABLE]: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum venenatis libero, vitae lacinia arcu ullamcorper a. Vivamus mattis pellentesque dolor quis venenatis.',
}[type] || '');

export function makeBlock(blockWithType: PartiallyRequired<BlockInterface, 'type'>): BlockInterface {
    const {type} = blockWithType;
    return {
        ...plainBlock,
        id: makeId(10),
        type,
        tagName: getTagName(type),
        styles: getStartingStyle(type),
        attributes: getStartingAttributes(type),
        textContent: getStartingTextContent(type)
    }
}

export function _mapBlock(block: BlockInterface, resetId = false): BlockInterface {
    return {
        ...plainBlock,
        ...block,
        ...(resetId ? {id: makeId(10)} : {}),
        children: block.children.map(b => _mapBlock(b, resetId))
    }
}
