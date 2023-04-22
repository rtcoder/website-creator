import IconPanel from "@/components/LeftPanel/LeftSettingsPanel/IconPanel/IconPanel";
import {useSelector} from "react-redux";
import {BLOCK_TYPES} from "@/helpers/blocks";

export default function () {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);

    return (
        <>
            {selectedBlock && selectedBlock.type === BLOCK_TYPES.ICON ? <IconPanel/> : ''}
        </>
    )
}
