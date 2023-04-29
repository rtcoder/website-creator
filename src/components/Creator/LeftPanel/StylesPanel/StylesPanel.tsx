import {useDispatch, useSelector} from "react-redux";
import Accordion from "@/components/construction/Accordion/Accordion";
import AccordionItem from "@/components/construction/Accordion/AccordionItem";
import NoBlock from "@/components/Creator/LeftPanel/NoBlock/NoBlock";
import {shouldShowStyleForBlockType} from "@/helpers/block-style-type";
import StyleStateSwitch from "@/components/Creator/LeftPanel/StylesPanel/StyleStateSwitch/StyleStateSwitch";
import Size from "@/components/Creator/LeftPanel/StylesPanel/Size/Size";
import {useCallback} from "react";
import {setStylesProperty} from "@/store/structureSlice";
import {SetStylesPropertyPayloadInterface} from "@/store/functions/block";
import BorderRadius from "@/components/Creator/LeftPanel/StylesPanel/BorderRadius/BorderRadius";
import Padding from "@/components/Creator/LeftPanel/StylesPanel/Padding/Padding";
import Margin from "@/components/Creator/LeftPanel/StylesPanel/Margin/Margin";
import Layout from "@/components/Creator/LeftPanel/StylesPanel/Layout/Layout";
import Border from "@/components/Creator/LeftPanel/StylesPanel/Border/Border";
import Quote from "@/components/Creator/LeftPanel/StylesPanel/Quote/Quote";
import Image from "@/components/Creator/LeftPanel/StylesPanel/Image/Image";
import TextColumns from "@/components/Creator/LeftPanel/StylesPanel/TextColumns/TextColumns";
import Text from "@/components/Creator/LeftPanel/StylesPanel/Text/Text";

export default function () {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const dispatch = useDispatch();
    const updateStyle = useCallback((data: SetStylesPropertyPayloadInterface) => {
        dispatch(setStylesProperty(data));
    }, [dispatch]);
    const styleChange = (value: string, property: string) => {
        console.log({property, value});
        updateStyle({
            property,
            value: value || null,
            styleState,
            rwd,
            blockId: selectedBlock.id,
        })
    }
    const stylesSections: [title: string, id: string, component: JSX.Element][] = [
        // ['Tło', 'background', (<>d</>)],
        ['Wymiary', 'size', (<Size onChange={styleChange}/>)],
        ['Zaokrąglenie narożników', 'border-radius', (<BorderRadius onChange={styleChange}/>)],
        // ['Styl tekstu', 'text', (<>d</>)],
        ['Kolumny tekstu', 'text-columns', (<TextColumns onChange={styleChange}/>)],
        ['Marginesy wewnętrzne', 'padding', (<Padding onChange={styleChange}/>)],
        // ['Filtry', 'filter', (<>d</>)],
        // ['Animacje', 'animations', (<>d</>)],
    ]
    const canShow = (id) => {
        return shouldShowStyleForBlockType(selectedBlock.type, id);
    }
    return (
        <div>
            {selectedBlock
                ? (<>
                    <StyleStateSwitch/>
                    <Accordion>
                        {canShow('layout') ? <AccordionItem title="Układ elementów">
                            <Layout onChange={styleChange}/>
                        </AccordionItem> : ''}
                        {canShow('size') ? <AccordionItem title="Wymiary">
                            <Size onChange={styleChange}/>
                        </AccordionItem> : ''}
                        {canShow('image') ? <AccordionItem title="Obraz">
                            <Image onChange={styleChange}/>
                        </AccordionItem> : ''}
                        {canShow('border') ? <AccordionItem title="Ramka">
                            <Border onChange={styleChange}/>
                        </AccordionItem> : ''}
                        {canShow('border-radius') ? <AccordionItem title="Zaokrąglenie narożników">
                            <BorderRadius onChange={styleChange}/>
                        </AccordionItem> : ''}
                        {canShow('text') ? <AccordionItem title="Styl tekstu">
                            <Text onChange={styleChange}/>
                        </AccordionItem> : ''}
                        {canShow('text-columns') ? <AccordionItem title="Kolumny tekstu">
                            <TextColumns onChange={styleChange}/>
                        </AccordionItem> : ''}
                        {canShow('quote') ? <AccordionItem title="Cytat">
                            <Quote onChange={styleChange}/>
                        </AccordionItem> : ''}
                        {canShow('margin') ? <AccordionItem title="Marginesy zewnętrzne">
                            <Margin onChange={styleChange}/>
                        </AccordionItem> : ''}
                        {canShow('padding') ? <AccordionItem title="Marginesy wewnętrzne">
                            <Padding onChange={styleChange}/>
                        </AccordionItem> : ''}
                    </Accordion>
                </>)
                : <NoBlock/>
            }
        </div>
    )
}
