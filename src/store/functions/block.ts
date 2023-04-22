import {StructureState} from "@/store/structureSlice";
import {findByIdRecursive, updateBlockInStructure} from "@/helpers/block";
import {BlockInterface, BlockSettingsIconInterface} from "@/interfaces/Block.interface";

const updateBlockIcon = (block: BlockInterface, icon: BlockSettingsIconInterface): BlockInterface => ({
    ...block,
    settings: {
        ...block.settings,
        icon
    }
})
export const setIconFn = (state: StructureState, {payload}) => {
    const {icon, blockId} = payload;
    console.log(payload)
    const {structure, selectedBlock} = state;
    const block = findByIdRecursive(structure, blockId);
    if (!block) {
        return;
    }
    const blockWithNewIcon = updateBlockIcon(block, icon);
    state.structure = updateBlockInStructure(structure, blockId, blockWithNewIcon);
    if (selectedBlock && selectedBlock.id === blockId) {
        state.selectedBlock = updateBlockIcon(selectedBlock, icon);
    }
};
