import IconPanel from "@/components/Creator/LeftPanel/LeftSettingsPanel/IconPanel/IconPanel";
import {useSelector} from "react-redux";
import Accordion from "@/components/construction/Accordion/Accordion";
import NoBlock from "@/components/Creator/LeftPanel/NoBlock/NoBlock";
import AccordionItem from "@/components/construction/Accordion/AccordionItem";
import Anchor from "@/components/Creator/LeftPanel/LeftSettingsPanel/Anchor/Anchor";
import HeadingTagName from "@/components/Creator/LeftPanel/LeftSettingsPanel/HeadingTagName/HeadingTagName";

export default function LeftSettingsPanel() {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);

    return (
        <div>
            {selectedBlock
                ? (<>
                    <Accordion>
                        <AccordionItem title="Nagłówek">
                            <HeadingTagName/>
                        </AccordionItem>
                        <AccordionItem title="Kotwica">
                            <Anchor/>
                        </AccordionItem>
                        <AccordionItem title="Ikonka">
                            <IconPanel/>
                        </AccordionItem>
                    </Accordion>
                </>)
                : <NoBlock/>
            }
        </div>
    )
}
