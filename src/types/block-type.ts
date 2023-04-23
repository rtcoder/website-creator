export namespace BlockTypes {
    export const CONTAINER = 0;
    export const PARAGRAPH = 1;
    export const HEADING = 2;
    export const UL = 3;
    export const IMAGE = 4;
    export const VIDEO = 5;
    export const BUTTON = 6;
    export const ICON = 7;
    export const AUDIO = 8;
    export const YOUTUBE = 9;
    export const VIMEO = 10;
    export const HR = 11;
    export const QUOTE = 12;
    export const IFRAME = 13;
    export const SPOTIFY = 14;
    export const PARAGRAPH_VARIABLE = 15;
    export const HEADING_VARIABLE = 16;
    export const IMAGE_VARIABLE = 17;
    export const VIDEO_VARIABLE = 18;
    export const AUDIO_VARIABLE = 19;
    export const ICON_VARIABLE = 20;
    export const QUOTE_VARIABLE = 21;
    export const GOOGLE_MAPS = 22;
    export const GOOGLE_CALENDAR = 23;

    export type BlockType =
        | typeof CONTAINER
        | typeof PARAGRAPH
        | typeof HEADING
        | typeof UL
        | typeof IMAGE
        | typeof VIDEO
        | typeof BUTTON
        | typeof ICON
        | typeof AUDIO
        | typeof YOUTUBE
        | typeof VIMEO
        | typeof HR
        | typeof QUOTE
        | typeof IFRAME
        | typeof SPOTIFY
        | typeof PARAGRAPH_VARIABLE
        | typeof HEADING_VARIABLE
        | typeof IMAGE_VARIABLE
        | typeof VIDEO_VARIABLE
        | typeof AUDIO_VARIABLE
        | typeof ICON_VARIABLE
        | typeof QUOTE_VARIABLE
        | typeof GOOGLE_MAPS
        | typeof GOOGLE_CALENDAR;
}
