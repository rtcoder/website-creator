import Accordion from "@/components/construction/Accordion/Accordion";
import {AccordionItemInterface} from "@/components/construction/Accordion/AccordionItem";
import BlocksList from "@/components/LeftPanel/Blocks/BlocksList";
import {BlockItemProps} from "@/components/LeftPanel/Blocks/BlockItem";
import {BlockTypes} from "@/types/block-type";

export default function () {
    const basicBlocks: BlockItemProps[] = [
        {name: 'Kontener', type: BlockTypes.CONTAINER, icon: {name: 'crop_3_2', type: 'material-outlined'}},
        {name: 'Nagłówek', type: BlockTypes.HEADING, icon: {name: 'format_h1', type: 'material-outlined'}},
        {name: 'Tekst', type: BlockTypes.PARAGRAPH, icon: {name: 'format_paragraph', type: 'material-outlined'}},
        {name: 'Lista', type: BlockTypes.UL, icon: {name: 'list', type: 'material-outlined'}},
        {name: 'Zdjęcie', type: BlockTypes.IMAGE, icon: {name: 'panorama', type: 'material-outlined'}},
        {name: 'Wideo', type: BlockTypes.VIDEO, icon: {name: 'smart_display', type: 'material-outlined'}},
        {
            name: 'Audio',
            type: BlockTypes.AUDIO,
            icon: {name: 'fa-sharp fa-light fa-waveform-lines', type: 'fontawesome'}
        },
        {name: 'Przycisk', type: BlockTypes.BUTTON, icon: {name: 'smart_button', type: 'material-outlined'}},
        {name: 'Ikonka', type: BlockTypes.ICON, icon: {name: 'emoticon', type: 'material-outlined'}},
        {name: 'Pozioma linia', type: BlockTypes.HR, icon: {name: 'fa-solid fa-horizontal-rule', type: 'fontawesome'}},
        {name: 'Cytat', type: BlockTypes.QUOTE, icon: {name: 'fa-duotone fa-quotes', type: 'fontawesome'}},
        {name: 'Iframe', type: BlockTypes.IFRAME, icon: {name: 'fa-thin fa-code-simple', type: 'fontawesome'}},
    ];
    const embedBlocks: BlockItemProps[] = [
        {name: 'YouTube', type: BlockTypes.YOUTUBE, icon: {name: 'fa-brands fa-youtube', type: 'fontawesome'}},
        {name: 'Vimeo', type: BlockTypes.VIMEO, icon: {name: 'fa-brands fa-vimeo-v', type: 'fontawesome'}},
        {name: 'Spotify', type: BlockTypes.SPOTIFY, icon: {name: 'fa-brands fa-spotify', type: 'fontawesome'}},
        {name: 'Mapy Google', type: BlockTypes.GOOGLE_MAPS, icon: {name: 'fa-light fa-map', type: 'fontawesome'}},
        {
            name: 'Kalendarz Google',
            type: BlockTypes.GOOGLE_CALENDAR,
            icon: {name: 'fa-sharp fa-solid fa-calendar-days', type: 'fontawesome'}
        },
    ];
    const variableBlocks: BlockItemProps[] = [
        {name: 'Nagłówek', type: BlockTypes.HEADING_VARIABLE, icon: {name: 'format_h1', type: 'material-outlined'}},
        {
            name: 'Tekst',
            type: BlockTypes.PARAGRAPH_VARIABLE,
            icon: {name: 'format_paragraph', type: 'material-outlined'}
        },
        {name: 'Zdjęcie', type: BlockTypes.IMAGE_VARIABLE, icon: {name: 'panorama', type: 'material-outlined'}},
        {name: 'Wideo', type: BlockTypes.VIDEO_VARIABLE, icon: {name: 'smart_display', type: 'material-outlined'}},
        {name: 'Audio', type: BlockTypes.AUDIO_VARIABLE, icon: {name: 'play_circle', type: 'material-outlined'}},
        {name: 'Ikonka', type: BlockTypes.ICON_VARIABLE, icon: {name: 'emoticon', type: 'material-outlined'}},
        {name: 'Cytat', type: BlockTypes.QUOTE_VARIABLE, icon: {name: 'fa-duotone fa-quotes', type: 'fontawesome'}},
    ];

    const items: AccordionItemInterface[] = [
        {
            title: 'Podstawowe',
            content: <BlocksList items={basicBlocks}/>
        },
        {
            title: 'Osadzanie',
            content: <BlocksList items={embedBlocks}/>
        },
        {
            title: 'Dynamiczne zmienne',
            content: <BlocksList items={variableBlocks}/>
        },
    ];

    return (
        <Accordion items={items}/>
    )
}
