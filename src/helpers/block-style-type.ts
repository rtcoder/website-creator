import {BlockTypes} from "@/types/block-type";

const BlockTypeStyleOptions = {
    [BlockTypes.CONTAINER]: [
        'layout', 'background', 'size', 'border', 'border-radius', 'text', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.PARAGRAPH]: [
        'background', 'size', 'border', 'border-radius', 'text', 'text-shadow', 'text-columns', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.HEADING]: [
        'background', 'size', 'border', 'border-radius', 'text', 'text-shadow', 'text-columns', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.UL]: [
        'background', 'size', 'border', 'border-radius', 'text', 'text-shadow', 'text-columns', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.IMAGE]: [
        'background', 'size', 'image', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.VIDEO]: [
        'background', 'size', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.BUTTON]: [
        'background', 'size', 'border', 'border-radius', 'text', 'text-shadow', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.ICON]: [
        'background', 'size', 'border', 'border-radius', 'text', 'text-shadow', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.AUDIO]: ['background', 'size', 'border', 'border-radius', 'margin', 'padding', 'animations',
    ],
    [BlockTypes.YOUTUBE]: [
        'background', 'size', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.VIMEO]: [
        'background', 'size', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.HR]: [
        'size', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.QUOTE]: [
        'background', 'size', 'border', 'border-radius', 'text', 'text-shadow', 'text-columns', 'quote', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.IFRAME]: [
        'background', 'size', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.SPOTIFY]: [
        'background', 'size', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.PARAGRAPH_VARIABLE]: [
        'background', 'size', 'border', 'border-radius', 'text', 'text-shadow', 'text-columns', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.HEADING_VARIABLE]: [
        'background', 'size', 'border', 'border-radius', 'text', 'text-shadow', 'text-columns', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.IMAGE_VARIABLE]: [
        'background', 'size', 'image', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.VIDEO_VARIABLE]: [
        'background', 'size', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.AUDIO_VARIABLE]: [
        'background', 'size', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.ICON_VARIABLE]: [
        'background', 'size', 'border', 'border-radius', 'text', 'text-shadow', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.QUOTE_VARIABLE]: [
        'background', 'size', 'border', 'border-radius', 'text', 'text-shadow', 'text-columns', 'quote', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.GOOGLE_MAPS]: [
        'background', 'size', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
    [BlockTypes.GOOGLE_CALENDAR]: [
        'background', 'size', 'border', 'border-radius', 'margin', 'padding', 'filter', 'animations',
    ],
}
export const shouldShowStyleForBlockType = (type: BlockTypes.BlockType, styleId: string): boolean => {
    return BlockTypeStyleOptions[type].includes(styleId);
}
