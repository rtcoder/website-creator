import IconPanel from "@/components/Creator/LeftPanel/LeftSettingsPanel/IconPanel/IconPanel";
import {useSelector} from "react-redux";
import Accordion from "@/components/construction/Accordion/Accordion";
import NoBlock from "@/components/Creator/LeftPanel/NoBlock/NoBlock";
import AccordionItem from "@/components/construction/Accordion/AccordionItem";
import Anchor from "@/components/Creator/LeftPanel/LeftSettingsPanel/Anchor/Anchor";
import HeadingTagName from "@/components/Creator/LeftPanel/LeftSettingsPanel/HeadingTagName/HeadingTagName";
import Link from "@/components/Creator/LeftPanel/LeftSettingsPanel/Link/Link";
import SpecialCharacters from "@/components/Creator/LeftPanel/LeftSettingsPanel/SpecialCharacters/SpecialCharacters";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockTypes} from "@/types/block-type";
import {isTextBlock} from "@/helpers/block-type-helpers";

export default function LeftSettingsPanel() {
    const selectedBlock: BlockInterface = useSelector((state: any) => state.structure.selectedBlock);

    return (
        <div>
            {selectedBlock
                ? (<>
                    <Accordion>
                        <AccordionItem title="Kotwica">
                            <Anchor/>
                        </AccordionItem>
                        <AccordionItem title="Link">
                            <Link/>
                        </AccordionItem>
                        {selectedBlock.type === BlockTypes.HEADING
                            ? <AccordionItem title="Nagłówek">
                                <HeadingTagName/>
                            </AccordionItem> : ''}
                        {selectedBlock.type === BlockTypes.ICON
                            ? <AccordionItem title="Ikonka">
                                <IconPanel/>
                            </AccordionItem> : ''}
                        {isTextBlock(selectedBlock)
                            ? <AccordionItem title="Znaki specjalne">
                                <SpecialCharacters/>
                            </AccordionItem> : ''}
                    </Accordion>
                </>)
                : <NoBlock/>
            }
        </div>
    )
}
