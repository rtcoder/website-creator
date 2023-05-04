import {BlockAttributesInterface, BlockInterface, BlockSettingsInterface, TagName} from "@/interfaces/Block.interface";
import {Styles} from "@/interfaces/Styles.interface";
import {makeId} from "@/helpers/string-helpers";
import {PartiallyRequired} from "@/types/utils";
import {BlockTypes} from "@/types/block-type";

const plainBlock: BlockInterface = {
    id: '',
    type: BlockTypes.CONTAINER,
    tagName: 'div',
    styles: {} as Styles,
    children: [],
    textContent: '',
    settings: {} as BlockSettingsInterface,
    attributes: {} as BlockAttributesInterface,
    blockLink: null,
}

const getTagName = (type: BlockTypes.BlockType): TagName => ({
    [BlockTypes.CONTAINER]: 'div',
    [BlockTypes.PARAGRAPH]: 'p',
    [BlockTypes.HEADING]: 'h1',
    [BlockTypes.UL]: 'ul',
    [BlockTypes.IMAGE]: 'img',
    [BlockTypes.VIDEO]: 'video',
    [BlockTypes.BUTTON]: 'button',
    [BlockTypes.AUDIO]: 'audio',
    [BlockTypes.YOUTUBE]: 'iframe',
    [BlockTypes.VIMEO]: 'iframe',
    [BlockTypes.HR]: 'hr',
    [BlockTypes.QUOTE]: 'q',
    [BlockTypes.IFRAME]: 'iframe',
    [BlockTypes.SPOTIFY]: 'iframe',
    [BlockTypes.PARAGRAPH_VARIABLE]: 'p',
    [BlockTypes.HEADING_VARIABLE]: 'h1',
    [BlockTypes.IMAGE_VARIABLE]: 'img',
    [BlockTypes.VIDEO_VARIABLE]: 'video',
    [BlockTypes.AUDIO_VARIABLE]: 'audio',
    [BlockTypes.QUOTE_VARIABLE]: 'q',
    [BlockTypes.GOOGLE_MAPS]: 'iframe',
    [BlockTypes.GOOGLE_CALENDAR]: 'iframe',
}[type] as TagName);

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

const getStartingStyle = (type: BlockTypes.BlockType): Styles => ({
    [BlockTypes.CONTAINER]: getContainerStartingStyles(),
    [BlockTypes.UL]: getContainerStartingStyles(),
    [BlockTypes.BUTTON]: {
        all: {
            basic: {
                'background-color': 'rgb(239, 239, 239)',
                width: '65px',
                height: '30px',
            }
        }
    },
    [BlockTypes.ICON]: getIconStartingStyles(),
    [BlockTypes.HR]: {
        all: {
            basic: {
                height: '1px',
                width: '100%',
                'margin-top': '0.5em',
                'margin-bottom': '0.5em'
            }
        }
    },
    [BlockTypes.SPOTIFY]: {
        all: {
            basic: {
                display: 'grid',
                width: '100%'
            }
        }
    },
    [BlockTypes.ICON_VARIABLE]: getIconStartingStyles(),
}[type] || {});
const getStartingAttributes = (type: BlockTypes.BlockType): BlockAttributesInterface => ({
    [BlockTypes.BUTTON]: {
        type: 'button'
    },
    [BlockTypes.YOUTUBE]: {
        src: '',
        frameBorder: '0',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        allowFullscreen: ''
    },
    [BlockTypes.VIMEO]: {
        src: '',
        frameBorder: '0',
        allow: 'autoplay; fullscreen; picture-in-picture',
        allowFullscreen: ''
    },
    [BlockTypes.IFRAME]: {
        src: '',
        frameBorder: '0',
    },
    [BlockTypes.SPOTIFY]: {
        src: '',
        frameBorder: '0',
        allowFullscreen: '',
        width: '100%',
        height: '100%',
        allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
        loading: 'lazy'
    },
    [BlockTypes.GOOGLE_MAPS]: {
        src: '',
        allowFullscreen: '',
        width: '100%',
        height: '100%',
        style: 'border:0;',
        referrerPolicy: 'no-referrer-when-downgrade',
        loading: 'lazy'
    },
    [BlockTypes.GOOGLE_CALENDAR]: {
        src: '',
        width: '100%',
        height: '100%',
        style: 'border:0;',
        frameBorder: '0',
        scrolling: 'no',
    },
}[type] as BlockAttributesInterface || {});
const getStartingTextContent = (type: BlockTypes.BlockType): string => ({
    [BlockTypes.PARAGRAPH]: 'Paragraf',
    [BlockTypes.HEADING]: 'Nagłówek',
    [BlockTypes.BUTTON]: 'Przycisk',
    [BlockTypes.QUOTE]: 'Cytat',
    [BlockTypes.PARAGRAPH_VARIABLE]: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis eros posuere erat aliquet mattis facilisis rutrum.',
    [BlockTypes.HEADING_VARIABLE]: 'Nagłówek',
    [BlockTypes.QUOTE_VARIABLE]: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum venenatis libero, vitae lacinia arcu ullamcorper a. Vivamus mattis pellentesque dolor quis venenatis.',
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
