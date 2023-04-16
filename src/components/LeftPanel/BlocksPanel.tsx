import Accordion from "@/components/construction/Accordion/Accordion";
import {AccordionItemInterface} from "@/components/construction/Accordion/AccordionItem";
import BlocksList from "@/components/LeftPanel/Blocks/BlocksList";
import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockItemProps} from "@/components/LeftPanel/Blocks/BlockItem";

export default function (params) {
    const basicBlocks:BlockItemProps[] = [
        {name: 'Kontener', type: BLOCK_TYPES.CONTAINER, icon: {name: 'crop_3_2', type: 'material-outlined'}},
        {name: 'Nagłówek', type: BLOCK_TYPES.HEADING, icon: {name: 'format_h1', type: 'material-outlined'}},
        {name: 'Tekst', type: BLOCK_TYPES.PARAGRAPH, icon: {name: 'format_paragraph', type: 'material-outlined'}},
        {name: 'Lista', type: BLOCK_TYPES.UL, icon: {name: 'list', type: 'material-outlined'}},
        {name: 'Zdjęcie', type: BLOCK_TYPES.IMAGE, icon: {name: 'panorama', type: 'material-outlined'}},
        {name: 'Wideo', type: BLOCK_TYPES.VIDEO, icon: {name: 'smart_display', type: 'material-outlined'}},
        {
            name: 'Audio',
            type: BLOCK_TYPES.AUDIO,
            icon: {name: 'fa-sharp fa-light fa-waveform-lines', type: 'fontawesome'}
        },
        {name: 'Przycisk', type: BLOCK_TYPES.BUTTON, icon: {name: 'smart_button', type: 'material-outlined'}},
        {name: 'Ikonka', type: BLOCK_TYPES.ICON, icon: {name: 'emoticon', type: 'material-outlined'}},
        {name: 'Pozioma linia', type: BLOCK_TYPES.HR, icon: {name: 'fa-solid fa-horizontal-rule', type: 'fontawesome'}},
        {name: 'Cytat', type: BLOCK_TYPES.QUOTE, icon: {name: 'fa-duotone fa-quotes', type: 'fontawesome'}},
        {name: 'Iframe', type: BLOCK_TYPES.IFRAME, icon: {name: 'fa-thin fa-code-simple', type: 'fontawesome'}},
    ];
    const embedBlocks:BlockItemProps[] = [
        {name: 'Kontener', type: BLOCK_TYPES.CONTAINER, icon: {name: 'crop_3_2', type: 'material-outlined'}},
        {name: 'Nagłówek', type: BLOCK_TYPES.HEADING, icon: {name: 'format_h1', type: 'material-outlined'}},
        {name: 'Tekst', type: BLOCK_TYPES.PARAGRAPH, icon: {name: 'format_paragraph', type: 'material-outlined'}},
        {name: 'Lista', type: BLOCK_TYPES.UL, icon: {name: 'list', type: 'material-outlined'}},
        {name: 'Zdjęcie', type: BLOCK_TYPES.IMAGE, icon: {name: 'panorama', type: 'material-outlined'}},
        {name: 'Wideo', type: BLOCK_TYPES.VIDEO, icon: {name: 'smart_display', type: 'material-outlined'}},
        {
            name: 'Audio',
            type: BLOCK_TYPES.AUDIO,
            icon: {name: 'fa-sharp fa-light fa-waveform-lines', type: 'fontawesome'}
        },
        {name: 'Przycisk', type: BLOCK_TYPES.BUTTON, icon: {name: 'smart_button', type: 'material-outlined'}},
        {name: 'Ikonka', type: BLOCK_TYPES.ICON, icon: {name: 'emoticon', type: 'material-outlined'}},
        {name: 'Pozioma linia', type: BLOCK_TYPES.HR, icon: {name: 'fa-solid fa-horizontal-rule', type: 'fontawesome'}},
        {name: 'Cytat', type: BLOCK_TYPES.QUOTE, icon: {name: 'fa-duotone fa-quotes', type: 'fontawesome'}},
        {name: 'Iframe', type: BLOCK_TYPES.IFRAME, icon: {name: 'fa-thin fa-code-simple', type: 'fontawesome'}},
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
            content: <BlocksList items={basicBlocks}/>
        },
    ];

    return (
        <Accordion items={items}/>
    )
}
