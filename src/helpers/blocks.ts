import {BlockTypes} from "@/types/block-type";

export const BLOCK_VARIABLE_TYPES = [
    BlockTypes.PARAGRAPH_VARIABLE,
    BlockTypes.HEADING_VARIABLE,
    BlockTypes.IMAGE_VARIABLE,
    BlockTypes.VIDEO_VARIABLE,
    BlockTypes.AUDIO_VARIABLE,
    BlockTypes.ICON_VARIABLE,
    BlockTypes.QUOTE_VARIABLE,
];

export const BLOCK_TYPES_HUMAN_NAMES = {
    [BlockTypes.CONTAINER]: 'Kontener',
    [BlockTypes.PARAGRAPH]: 'Tekst',
    [BlockTypes.HEADING]: 'Nagłówek',
    [BlockTypes.UL]: 'Lista',
    [BlockTypes.IMAGE]: 'Zdjęcie',
    [BlockTypes.VIDEO]: 'Wideo',
    [BlockTypes.BUTTON]: 'Przycisk',
    [BlockTypes.ICON]: 'Ikonka',
    [BlockTypes.AUDIO]: 'Audio',
    [BlockTypes.YOUTUBE]: 'YouTube',
    [BlockTypes.VIMEO]: 'Vimeo',
    [BlockTypes.HR]: 'Pozioma linia',
    [BlockTypes.QUOTE]: 'Cytat',
    [BlockTypes.IFRAME]: 'Iframe',
    [BlockTypes.PARAGRAPH_VARIABLE]: '$Tekst$',
    [BlockTypes.HEADING_VARIABLE]: '$Nagłówek$',
    [BlockTypes.IMAGE_VARIABLE]: '$Zdjęcie$',
    [BlockTypes.VIDEO_VARIABLE]: '$Wideo$',
    [BlockTypes.AUDIO_VARIABLE]: '$Audio$',
    [BlockTypes.ICON_VARIABLE]: '$Ikonka$',
    [BlockTypes.QUOTE_VARIABLE]: '$Cytat$',
    [BlockTypes.GOOGLE_MAPS]: 'Mapy Google',
    [BlockTypes.GOOGLE_CALENDAR]: 'Kalendarz Google',
};
