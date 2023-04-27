import {useDispatch, useSelector} from "react-redux";
import Accordion from "@/components/construction/Accordion/Accordion";
import {AccordionItemInterface} from "@/components/construction/Accordion/AccordionItem";
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
            value,
            styleState,
            rwd,
            blockId: selectedBlock.id,
        })
    }
    const stylesSections: [title: string, id: string, component: JSX.Element][] = [
        ['Układ elementów', 'layout', (<Layout onChange={styleChange}/>)],
        // ['Tło', 'background', (<>d</>)],
        ['Wymiary', 'size', (<Size onChange={styleChange}/>)],
        // ['Obraz', 'image', (<>d</>)],
        ['Ramka', 'border', (<Border onChange={styleChange}/>)],
        ['Zaokrąglenie narożników', 'border-radius', (<BorderRadius onChange={styleChange}/>)],
        // ['Styl tekstu', 'text', (<>d</>)],
        // ['Kolumny tekstu', 'text-columns', (<>d</>)],
        // ['Cytat', 'quote', (<>d</>)],
        ['Marginesy zewnętrzne', 'margin', (<Margin onChange={styleChange}/>)],
        ['Marginesy wewnętrzne', 'padding', (<Padding onChange={styleChange}/>)],
        // ['Filtry', 'filter', (<>d</>)],
        // ['Animacje', 'animations', (<>d</>)],
    ]
    const getItemStyles = (): AccordionItemInterface[] => {
        return stylesSections
            .filter(([, id, ,]) => shouldShowStyleForBlockType(selectedBlock.type, id))
            .map(([title, , content]) => ({title, content}));
    }
    return (
        <div>
            {selectedBlock
                ? (<>
                    <StyleStateSwitch/>
                    <Accordion items={getItemStyles()}/>
                </>)
                : <NoBlock/>
            }
        </div>
    )
}
