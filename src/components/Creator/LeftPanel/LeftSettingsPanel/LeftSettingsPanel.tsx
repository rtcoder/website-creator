import IconPanel from "@/components/Creator/LeftPanel/LeftSettingsPanel/IconPanel/IconPanel";
import {useSelector} from "react-redux";
import Accordion from "@/components/construction/Accordion/Accordion";
import NoBlock from "@/components/Creator/LeftPanel/NoBlock/NoBlock";
import AccordionItem from "@/components/construction/Accordion/AccordionItem";

export default function () {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);

    return (
        <div>
            {selectedBlock
                ? (<>
                    <Accordion>
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
