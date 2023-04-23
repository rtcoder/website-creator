export = BlockTypes;
export as namespace BlockTypes;
declare namespace BlockTypes {
    const CONTAINER = 0;
    const PARAGRAPH = 1;
    const HEADING = 2;
    const UL = 3;
    const IMAGE = 4;
    const VIDEO = 5;
    const BUTTON = 6;
    const ICON = 7;
    const AUDIO = 8;
    const YOUTUBE = 9;
    const VIMEO = 10;
    const HR = 11;
    const QUOTE = 12;
    const IFRAME = 13;
    const SPOTIFY = 14;
    const PARAGRAPH_VARIABLE = 15;
    const HEADING_VARIABLE = 16;
    const IMAGE_VARIABLE = 17;
    const VIDEO_VARIABLE = 18;
    const AUDIO_VARIABLE = 19;
    const ICON_VARIABLE = 20;
    const QUOTE_VARIABLE = 21;
    const GOOGLE_MAPS = 22;
    const GOOGLE_CALENDAR = 23;

    type BlockType =
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
