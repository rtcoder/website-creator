import IconPanel from "@/components/LeftPanel/LeftSettingsPanel/IconPanel/IconPanel";
import {useSelector} from "react-redux";
import BlockTypes from "@/types/block-type";

export default function () {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);

    return (
        <>
            {selectedBlock && selectedBlock.type === BlockTypes.ICON ? <IconPanel/> : ''}
        </>
    )
}
